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

  let root: any = null;

  const render = (newProps: any) => {
    const combinedProps = { ...props, ...newProps };
    if ((ReactDOM as any).createRoot) {
      if (!root) {
        // @ts-ignore
        root = ReactDOM.createRoot(target);
      }
      root.render(React.createElement(NepaliDatePicker, combinedProps));
    } else {
      // Legacy fallback
      ReactDOM.render(React.createElement(NepaliDatePicker, combinedProps), target);
    }
  };

  // Initial render
  render(props);

  return {
    unmount: () => {
      if (root) {
        root.unmount();
      } else {
        ReactDOM.unmountComponentAtNode(target);
      }
    },
    setValue: (val: string) => {
      render({ value: val });
    }
  };
}
