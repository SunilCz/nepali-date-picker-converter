// React-free core entry point
export * from "./core/converter";
export * from "./core/types";
export { NepaliDate } from "./core/NepaliDate";
export * from "./utils/formatter";

import * as converter from "./core/converter";
import { NepaliDate } from "./core/NepaliDate";
import * as formatter from "./utils/formatter";

export default {
    ...converter,
    ...formatter,
    NepaliDate
};
