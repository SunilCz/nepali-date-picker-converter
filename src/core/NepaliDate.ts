import { adToBs, bsToAd, formatBs } from "./converter";
import { BSDate, DateFormat, DisplayType } from "./types";
import { toNepaliNumeral } from "../utils/formatter";

export class NepaliDate {
  public bs: string;
  public ad: Date | null;
  public nepali: string;
  public bsDate: BSDate;

  constructor(date?: Date | BSDate | string) {
    if (!date) {
      this._bs = adToBs(new Date()) || { year: 2081, month: 1, day: 1 };
    } else if (date instanceof Date) {
      this._bs = adToBs(date) || adToBs(new Date()) || { year: 2081, month: 1, day: 1 };
    } else if (typeof date === "string") {
      const [y, m, d] = date.split(/[-/]/).map(Number);
      if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d) ||
          m < 1 || m > 12 || d < 1 || d > 32) {
        this._bs = adToBs(new Date()) || { year: 2081, month: 1, day: 1 };
      } else {
        this._bs = { year: y, month: m, day: d };
      }
    } else {
      this._bs = date;
    }

    // Initialize result properties
    this.bsDate = { ...this._bs };
    this.ad = bsToAd(this._bs.year, this._bs.month, this._bs.day);
    this.bs = `${this._bs.year}-${String(this._bs.month).padStart(2, "0")}-${String(this._bs.day).padStart(2, "0")}`;
    this.nepali = toNepaliNumeral(this.bs); 
  }

  private get _bs(): BSDate {
    return this.bsDate;
  }
  private set _bs(val: BSDate) {
    this.bsDate = val;
  }

  toString(): string {
    return this.format("YYYY-MM-DD");
  }

  static parse(dateStr: string): NepaliDate {
    return new NepaliDate(dateStr);
  }

  static today(): NepaliDate {
    return new NepaliDate(new Date());
  }

  getYear(): number {
    return this.bsDate.year;
  }

  getMonth(): number {
    return this.bsDate.month;
  }

  getDate(): number {
    return this.bsDate.day;
  }

  getDay(): number {
    const ad = bsToAd(this.bsDate.year, this.bsDate.month, this.bsDate.day);
    return ad ? ad.getUTCDay() : 0;
  }

  toAD(): Date | null {
    return bsToAd(this.bsDate.year, this.bsDate.month, this.bsDate.day);
  }

  toBS(): BSDate {
    return { ...this.bsDate };
  }

  format(
    format: DateFormat = "YYYY-MM-DD",
    displayMonth: DisplayType = "numeric",
    displayDay: DisplayType = "numeric"
  ): string {
    return formatBs(this.bsDate, format, displayMonth, displayDay);
  }
}
