import * as converter from "./core/converter";
import * as types from "./core/types";
import * as formatter from "./utils/formatter";
import { NepaliDate } from "./core/NepaliDate";
import { NepaliDatePicker } from "./components/DatePicker";
import { mountNepaliDatePicker } from "./utils/mount";

// Named exports
export * from "./core/converter";
export * from "./core/types";
export * from "./utils/formatter";
export { NepaliDate } from "./core/NepaliDate";
export { NepaliDatePicker, NepaliDatePickerProps } from "./components/DatePicker";
export { mountNepaliDatePicker } from "./utils/mount";

export const VERSION = "0.1.6";
export const NAME = "nepali-date-picker-converter";

// Default export for developer convenience
export default {
  ...converter,
  ...types,
  ...formatter,
  NepaliDate,
  NepaliDatePicker,
  mountNepaliDatePicker,
  VERSION,
  NAME
};
