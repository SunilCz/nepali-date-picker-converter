# Nepali Date Picker & Converter

A comprehensive library for converting between Nepali (Bikram Sambat) and English (Gregorian) calendars, with a beautiful React date picker component. Works seamlessly with **React**, **Angular**, **PHP**, **Laravel**, and **vanilla JavaScript/TypeScript**.

[![npm version](https://img.shields.io/npm/v/nepali-date-picker-converter.svg)](https://www.npmjs.com/package/nepali-date-picker-converter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**[🚀 Live Demo](https://sunilcz.github.io/nepali-date-picker-converter-example/)** | [Documentation](#-quick-start) | [NPM Package](https://www.npmjs.com/package/nepali-date-picker-converter)

## ✨ Features

- 🔄 **Bidirectional Conversion** - Convert between Nepali (BS) and English (AD) dates
- 📅 **Beautiful Date Picker** - Interactive React component with calendar UI
- 🎯 **Type-Safe** - Full TypeScript support
- 📦 **Lightweight** - Framework-agnostic core library
- 🌐 **Multi-Framework** - Works with React, Angular, PHP, Laravel, and vanilla JS
- 🎨 **Customizable** - Theme support and styling options
- 🇳🇵 **Nepali Support** - Nepali numerals and language support
- 📊 **Accurate** - Supports dates from 1970 BS to 2099 BS (1913 AD to 2043 AD)

## 📦 Installation

### Option 1: npm (Recommended for React/Angular projects)

```bash
npm install nepali-date-picker-converter
```

For React component, also install React (if not already installed):

```bash
npm install react react-dom
```

### Option 2: CDN (Recommended for PHP/Vanilla JS)

You can use the library directly in your HTML files.

#### Core Logic Only (**React-Free**, 16KB)

```html
<script src="https://unpkg.com/nepali-date-picker-converter@0.1.29/dist/bundle.umd.js"></script>
```

#### Full UI Component (Requires React)

```html
<!-- Dependencies -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Library & Styles -->
<script src="https://unpkg.com/nepali-date-picker-converter@0.1.29/dist/bundle.react.umd.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/nepali-date-picker-converter@0.1.29/dist/bundle.react.umd.css"
/>
```

## 🚀 Quick Start

### JavaScript/TypeScript (Core Library)

```typescript
import { adToBs, bsToAd, NepaliDate } from "nepali-date-picker-converter";

// Convert English date to Nepali
const nepaliDate = adToBs(new Date(2024, 0, 15));
console.log(nepaliDate);
// { year: 2080, month: 10, day: 2 }

// Convert Nepali date to English
const englishDate = bsToAd(2080, 10, 15);
console.log(englishDate);
// Date object: 2024-01-29
```

### Vanilla JS / PHP / Laravel (No React knowledge needed)

Use the `mountNepaliDatePicker` helper to embed the UI component without writing React code.

```html
<div id="datepicker"></div>

<script>
  const { mountNepaliDatePicker } = window.NepaliDatePickerConverter;

  mountNepaliDatePicker("#datepicker", {
    onChange: (result) => {
      console.log("Selected Object:", result);
      // result.bsDate => { year, month, day }
    },
    theme: { primary: "#2563eb" },
  });
</script>
```

### React Component

```tsx
import React, { useState } from "react";
import { NepaliDatePicker, NepaliDate } from "nepali-date-picker-converter";
import "nepali-date-picker-converter/dist/bundle.react.umd.css";

function App() {
  const [date, setDate] = useState<NepaliDate | null>(null);

  const handleDateChange = (val: NepaliDate | null) => {
    if (!val) return;

    // val is a complex object with methods
    // NOTE: val.format("YYYY-MM-DD") always returns ASCII digits (e.g. "2082-10-15")
    // for compatibility with APIs and databases.
    console.log("BS Date:", val.format("YYYY-MM-DD"));
    console.log("AD Date:", val.toAD());

    setDate(val);
  };

  return (
    <NepaliDatePicker
      value={date}
      placeholder="Select Event Date"
      inputClassName="form-control"
      max={new NepaliDate()} // Max date is today
      onChange={handleDateChange}
      theme={{ primary: "#2563eb" }}
    />
  );
}
```

### Angular

```typescript
import { Component, AfterViewInit, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  template: "<div #picker></div>",
})
export class AppComponent implements AfterViewInit {
  @ViewChild("picker") picker!: ElementRef;

  ngAfterViewInit() {
    // Via CDN or window object
    const { mountNepaliDatePicker } = (window as any).NepaliDatePickerConverter;
    mountNepaliDatePicker(this.picker.nativeElement, {
      onChange: (date: any) => console.log(date),
    });
  }
}
```

## 📚 API Reference

### Core Functions

#### `adToBs(adDate: Date): BSDate`

Converts English (Gregorian) to Nepali (Bikram Sambat).

#### `bsToAd(year: number, month: number, day: number): Date`

Converts Nepali (Bikram Sambat) to English (Gregorian).

#### `mountNepaliDatePicker(element: string | HTMLElement, props: Props)`

Mounts the UI component into a DOM element. Ideal for non-React environments.

**Example:**

```javascript
mountNepaliDatePicker("#root", {
  onChange: (res) => console.log(res),
  theme: { radius: "8px" },
});
```

#### `picker.setValue(bsDateString: string)`

Updates the picker selection programmatically. Useful for two-way synchronization with other inputs.

**Example:**

```javascript
const picker = mountNepaliDatePicker("#picker");
picker.setValue("2081-10-15");
```

### React Component Props

```typescript
interface NepaliDatePickerProps {
  /**
   * Callback when date is selected. Returns complex NepaliDate object.
   * Both value.bs and value.format("YYYY-MM-DD") are guaranteed to be ASCII strings.
   */
  onChange?: (
    value: NepaliDate | null,
    result: DatePickerResult | null,
  ) => void;
  /** Custom theme configuration */
  theme?: Theme;
  /** "YYYY-MM-DD" or NepaliDate object */
  value?: string | NepaliDate;
  /** Max selectable date ("YYYY-MM-DD" or NepaliDate) */
  max?: string | NepaliDate;
  /** Min selectable date ("YYYY-MM-DD" or NepaliDate) */
  min?: string | NepaliDate;
  /** Custom placeholder for input */
  placeholder?: string;
  /** Custom CSS class for the input field */
  inputClassName?: string;
  /** UI language: "en" | "np" */
  language?: "en" | "np";
  /** Show the language switcher toggle */
  showLanguageSwitcher?: boolean;
}
```

### ⚡ Reactivity & Auto-Sync (New)

The `NepaliDatePicker` is now reactive to its `value` prop. You can easily sync it with a standard English (AD) calendar:

```tsx
const [bsValue, setBsValue] = useState("2082-01-01");

const handleADChange = (e) => {
  const adDate = new Date(e.target.value);
  const bs = adToBs(adDate);
  setBsValue(
    `${bs.year}-${String(bs.month).padStart(2, "0")}-${String(bs.day).padStart(2, "0")}`,
  );
};

return (
  <>
    <input type="date" onChange={handleADChange} />
    <NepaliDatePicker value={bsValue} />
  </>
);
```

### 🌐 Multi-Language Support (New)

The picker now supports an interactive language switcher and global language defaults.

```tsx
// Using props in React
<NepaliDatePicker
  language="np" // Start entirely in Nepali
  showLanguageSwitcher={true} // Show the "ने / EN" toggle button
/>
```

```javascript
// Using mount helper
mountNepaliDatePicker("#root", {
  language: "en",
  showLanguageSwitcher: true,
});
```

## 🌐 Framework-Specific Guides

- **React**: [Reference above](#react-component) or use npm.
- **Angular**: See [angular/README.md](angular/README.md).
- **PHP/Laravel**: See [php/README.md](php/README.md).
- **Vanilla JS**: See [Vanilla JS example](#vanilla-js--php--laravel-no-react-knowledge-needed).

### Vanilla JavaScript (ES Modules)

```html
<script type="module">
  import {
    adToBs,
    bsToAd,
  } from "https://unpkg.com/nepali-date-picker-converter@0.1.21/dist/index.mjs";
  const bsDate = adToBs(new Date());
  console.log(bsDate);
</script>
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Development mode
npm run dev
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📮 Support

For issues and questions, please open an issue on GitHub.

## 🎯 Roadmap

- [ ] More date formatting options
- [ ] Additional language support
- [ ] Date range picker
- [ ] Time picker support
- [ ] More framework integrations

---

Made with ❤️ for the Nepali developer community
