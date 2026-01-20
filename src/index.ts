// Core Logic
import * as converter from "./core/converter";
import { NepaliDate } from "./core/NepaliDate";
import { NepaliDatePicker } from "./components/DatePicker";
import { mountNepaliDatePicker } from "./utils/mount";
import * as formatter from "./utils/formatter";

// Named Exports
export * from "./core/converter";
export * from "./core/types";
export { NepaliDate } from "./core/NepaliDate";
export * from "./utils/formatter";
export { NepaliDatePicker } from "./components/DatePicker";
export type { NepaliDatePickerProps } from "./components/DatePicker";
export { mountNepaliDatePicker } from "./utils/mount";

// Meta
export const VERSION = "0.1.12";
export const NAME = "nepali-date-picker-converter";

// Default Export
export default {
  ...converter,
  ...formatter,
  NepaliDate,
  NepaliDatePicker,
  mountNepaliDatePicker,
  VERSION,
  NAME,
};
