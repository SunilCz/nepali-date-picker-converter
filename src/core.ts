// Core exports - framework agnostic
import * as converter from "./core/converter";
import * as types from "./core/types";
import * as formatter from "./utils/formatter";
import { NepaliDate } from "./core/NepaliDate";

// Named exports
export * from "./core/converter";
export * from "./core/types";
export * from "./utils/formatter";
export { NepaliDate } from "./core/NepaliDate";

// Version info
export const VERSION = "0.1.6";
export const NAME = "nepali-date-picker-converter";

// Default export
export default {
  ...converter,
  ...types,
  ...formatter,
  NepaliDate,
  VERSION,
  NAME
};
