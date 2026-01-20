// Core exports - framework agnostic
export * from "./core/converter";
export * from "./core/types";
export * from "./utils/formatter";
export { NepaliDate } from "./core/NepaliDate";

// React component export (optional - users need React installed)
// Note: CSS needs to be imported separately: import 'nepali-date-picker-converter/dist/components/styles.css'
export { NepaliDatePicker } from "./components/DatePicker";

// Default export
export default {
  version: "0.1.0",
  name: "nepali-date-picker-converter",
};
