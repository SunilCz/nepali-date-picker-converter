// 1. Import everything first
import { adToBs, bsToAd, formatBs, formatAd } from "./core/converter";
import { NepaliDate } from "./core/NepaliDate";
import { NepaliDatePicker, NepaliDatePickerProps } from "./components/DatePicker";
import { mountNepaliDatePicker } from "./utils/mount";
import { toNepaliNumeral, toEnglishNumeral } from "./utils/formatter";

// 2. Named Exports (Always recommended)
export {
  adToBs,
  bsToAd,
  NepaliDate,
  NepaliDatePicker,
  NepaliDatePickerProps,
  mountNepaliDatePicker,
  formatBs,
  formatAd,
  toNepaliNumeral,
  toEnglishNumeral
};

export * from "./core/types";

export const VERSION = "0.1.7";
export const NAME = "nepali-date-picker-converter";

// 3. Default Export (For convenience)
const NepaliDatePickerConverter = {
  adToBs,
  bsToAd,
  NepaliDate,
  NepaliDatePicker,
  mountNepaliDatePicker,
  formatBs,
  formatAd,
  toNepaliNumeral,
  toEnglishNumeral,
  VERSION,
  NAME
};

export default NepaliDatePickerConverter;
