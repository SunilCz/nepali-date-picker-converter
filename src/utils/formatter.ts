const nepaliNumerals: string[] = [
  "०",
  "१",
  "२",
  "३",
  "४",
  "५",
  "६",
  "७",
  "८",
  "९",
];

/**
 * Normalizes an input (string or NepaliDate) into a valid ASCII "YYYY-MM-DD" BS string.
 * Returns null if the input is malformed or empty.
 */
export function getSafeBSDateString(val: any): string | null {
  if (!val) return null;
  
  if (typeof val === "string") {
    // Basic format check: YYYY-MM-DD or YYYY/MM/DD
    const match = val.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
    if (!match) return null;
    
    const [_, y, m, d] = match;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  
  // Handle NepaliDate or objects with .format()
  if (typeof val.format === "function") {
    return val.format("YYYY-MM-DD");
  }
  
  // Handle objects with .bs property
  if (typeof val.bs === "string") {
    return val.bs;
  }
  
  return null;
}

/**
 * Converts English digits (0-9) in a string to Nepali numerals (०-९)
 */
export function toNepaliNumeral(str: string | number): string {
  return String(str).replace(/\d/g, (d) => nepaliNumerals[parseInt(d)]);
}

/**
 * Converts Nepali numerals (०-९) in a string to English digits (0-9)
 */
export function toEnglishNumeral(str: string): string {
  return String(str).replace(/[०-९]/g, (d) => {
    const index = nepaliNumerals.indexOf(d);
    // If for some reason the character isn't found, return it as is,
    // otherwise return the string version of its index
    return index !== -1 ? index.toString() : d;
  });
}
