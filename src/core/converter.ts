import {
  NepaliDaysData,
  NepaliMonthsData,
  NP_INITIAL_YEAR,
  NP_MONTHS_DATA,
} from "./metadata";
import { BSDate, DateFormat, DisplayType } from "./types";


/** Nepal Standard Time offset (UTC +05:45) */
const NEPAL_OFFSET_MIN = 5 * 60 + 45;

/**
 * Normalize AD date to UTC midnight
 * This prevents double timezone offset bugs when dates are manually provided
 */
function normalizeToUtc(date: Date): Date {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
}

/**
 * Base reference:
 * 1943-04-14 AD (UTC midnight) === NP_INITIAL_YEAR-01-01 BS
 */
const AD_REFERENCE = new Date(Date.UTC(1913, 3, 13));

/**
 * AD → BS Converter
 * Returns BSDate object for Date input, or "YYYY-MM-DD" string for string input.
 * Returns null/"" respectively on invalid input.
 */
export function adToBs(adDate: Date): BSDate | null;
export function adToBs(adDate: string): string;
export function adToBs(adDate: Date | string): BSDate | string | null {
  try {
    let dateObj: Date;
    const isStrInput = typeof adDate === "string";

    if (isStrInput) {
      dateObj = new Date(adDate);
    } else {
      dateObj = adDate;
    }

    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      return isStrInput ? "" : null;
    }

    const adUtc = normalizeToUtc(dateObj);
    let totalDays = Math.floor(
      (adUtc.getTime() - AD_REFERENCE.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (totalDays < 0 || totalDays >= 1000000) {
      // Basic bounds check
      return isStrInput ? "" : null;
    }

    let bsYear = NP_INITIAL_YEAR;
    let yearIndex = 0;

    while (yearIndex < NP_MONTHS_DATA.length) {
      const yearMonths = NP_MONTHS_DATA[yearIndex][0];
      const yearDays = yearMonths.reduce((a, b) => a + b, 0);

      if (totalDays < yearDays) break;

      totalDays -= yearDays;
      yearIndex++;
      bsYear++;
    }

    if (yearIndex >= NP_MONTHS_DATA.length) {
      return isStrInput ? "" : null;
    }

    const monthsData = NP_MONTHS_DATA[yearIndex][0];
    let bsMonth = 1;

    for (let i = 0; i < 12; i++) {
      if (totalDays < monthsData[i]) break;
      totalDays -= monthsData[i];
      bsMonth++;
    }

    const result = {
      year: bsYear,
      month: bsMonth,
      day: totalDays + 1,
    };

    if (isStrInput) {
      return `${result.year}-${String(result.month).padStart(2, "0")}-${String(result.day).padStart(2, "0")}`;
    }
    return result;
  } catch (e) {
    return typeof adDate === "string" ? "" : null;
  }
}

/**
 * BS → AD Converter
 * Accepts (year, month, day) OR (dateString) OR (NepaliDate instance).
 * Returns Date object for number/object input, or "YYYY-MM-DD" string for string input.
 * Returns null/"" respectively on invalid input.
 */
export function bsToAd(year: number, month: number, day: number): Date | null;
export function bsToAd(dateString: string): string;
export function bsToAd(nepaliDate: { toBS: () => BSDate }): Date | null;
export function bsToAd(
  yearOrStr: number | string | { toBS: () => BSDate },
  month?: number,
  day?: number
): Date | string | null {
  try {
    let bsYear: number;
    let bsMonth: number;
    let bsDay: number;
    const isStrInput = typeof yearOrStr === "string";

    if (isStrInput) {
      const parts = yearOrStr.split(/[-/]/).map(Number);
      if (parts.length < 3 || parts.some(isNaN)) return "";
      bsYear = parts[0];
      bsMonth = parts[1];
      bsDay = parts[2];
    } else if (yearOrStr !== null && typeof yearOrStr === "object" && "toBS" in (yearOrStr as any)) {
      const bs = (yearOrStr as any).toBS();
      bsYear = bs.year;
      bsMonth = bs.month;
      bsDay = bs.day;
    } else {
      bsYear = yearOrStr as number;
      bsMonth = month!;
      bsDay = day!;
    }

    const yearIndex = bsYear - NP_INITIAL_YEAR;
    const yearData = NP_MONTHS_DATA[yearIndex];

    if (!yearData) return isStrInput ? "" : null;

    let totalDays = 0;
    for (let y = 0; y < yearIndex; y++) {
      totalDays += NP_MONTHS_DATA[y][0].reduce((a, b) => a + b, 0);
    }

    const months = yearData[0];
    if (bsMonth < 1 || bsMonth > 12) return isStrInput ? "" : null;

    for (let m = 0; m < bsMonth - 1; m++) {
      totalDays += months[m];
    }

    totalDays += bsDay - 1;
    const adUtc = new Date(AD_REFERENCE);
    adUtc.setUTCDate(adUtc.getUTCDate() + totalDays);

    if (isStrInput) {
      return formatAd(adUtc, "YYYY-MM-DD");
    }
    return adUtc;
  } catch (e) {
    return typeof yearOrStr === "string" ? "" : null;
  }
}

//
// ──────────────────────────────────────────────
// Formatting Utilities (User Choice)
// ──────────────────────────────────────────────
//

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function formatBs(
  date: BSDate,
  format: DateFormat = "YYYY-MM-DD",
  displayMonth: DisplayType = "numeric",
  displayDay: DisplayType = "numeric"
): string {
  // ISO-like data formats always use ASCII digits
  const isDataFormat = ["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY", "YYYY/MM/DD"].includes(format);

  if (isDataFormat) {
    const y = date.year.toString();
    const m = date.month.toString().padStart(2, "0");
    const d = date.day.toString().padStart(2, "0");

    switch (format) {
      case "DD-MM-YYYY":
        return `${d}-${m}-${y}`;
      case "DD/MM/YYYY":
        return `${d}/${m}/${y}`;
      case "YYYY/MM/DD":
        return `${y}/${m}/${d}`;
      default:
        return `${y}-${m}-${d}`;
    }
  }

  // Custom formats can use Nepali numerals if requested
  const y = convertToNepaliNumber(date.year);
  const monthName = getNepaliMonth(date.month, displayMonth);
  const dayName = getNepaliDayName(date, displayDay);

  let m = displayMonth === "numeric" ? convertToNepaliNumber(date.month) : monthName;
  let d = displayDay === "numeric" ? convertToNepaliNumber(date.day) : dayName;

  return format
    .replace("YYYY", y)
    .replace("MM", m)
    .replace("DD", d);
}

/** Convert 1,2,3.. to Nepali digits १,२,३.. */
function convertToNepaliNumber(num: number): string {
  return num
    .toString()
    .split("")
    .map((d) => String.fromCharCode(0x0966 + parseInt(d)))
    .join("");
}

/** Get Nepali month name */
function getNepaliMonth(month: number, type: DisplayType): string {
  const name = NepaliMonthsData[month - 1].np; // full name
  if (type === "long") return name;
  if (type === "short") return name.slice(0, 3); // first 3 chars as short
  return convertToNepaliNumber(month); // numeric
}

/** Get Nepali day name */
function getNepaliDayName(bsDate: BSDate, type: DisplayType): string {
  // Convert BS date to AD to get the correct weekday
  const adDate = bsToAd(bsDate.year, bsDate.month, bsDate.day);
  const index = adDate ? adDate.getUTCDay() : 0; // 0=Sunday, 1=Monday, ... 6=Saturday
  const name = NepaliDaysData[index].np;
  if (type === "long") return name;
  if (type === "short") return name.slice(0, 3); // first 3 chars
  return convertToNepaliNumber(bsDate.day); // numeric
}

/**
 * Format AD Date
 */
export function formatAd(
  date: Date,
  format: DateFormat = "YYYY-MM-DD"
): string {
  const y = date.getUTCFullYear();
  const m = pad(date.getUTCMonth() + 1);
  const d = pad(date.getUTCDate());

  switch (format) {
    case "DD-MM-YYYY":
      return `${d}-${m}-${y}`;
    case "DD/MM/YYYY":
      return `${d}/${m}/${y}`;
    case "YYYY/MM/DD":
      return `${y}/${m}/${d}`;
    default:
      return `${y}-${m}-${d}`;
  }
}
