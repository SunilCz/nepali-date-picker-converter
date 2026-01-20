import React from "react";
import ReactDOM from "react-dom";
import { NepaliDatePicker } from "../components/DatePicker";

/**
 * Mounts the NepaliDatePicker component into a DOM element.
 * This helper allows using the date picker without writing React code.
 * 
 * @param element The DOM element (or selector) to mount into
 * @param props DatePicker props (onChange, theme, etc.)
 */
export function mountNepaliDatePicker(
  element: HTMLElement | string,
  props: any = {}
) {
  const target = typeof element === "string" 
    ? document.querySelector(element) 
    : element;

  if (!target) {
    console.error("NepaliDatePicker: Target element not found", element);
    return null;
  }

  // Handle both React 18+ (createRoot) and legacy React
  // @ts-ignore
  if (ReactDOM.createRoot) {
    // @ts-ignore
    const root = ReactDOM.createRoot(target);
    root.render(React.createElement(NepaliDatePicker, props));
    return {
      unmount: () => root.unmount(),
    };
  } else {
    // Legacy fallback
    ReactDOM.render(React.createElement(NepaliDatePicker, props), target);
    return {
      unmount: () => ReactDOM.unmountComponentAtNode(target),
    };
  }
}
