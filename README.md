# Nepali Date Picker & Converter

A comprehensive library for converting between Nepali (Bikram Sambat) and English (Gregorian) calendars, with a beautiful React date picker component. Works seamlessly with **React**, **Angular**, **PHP**, **Laravel**, and **vanilla JavaScript/TypeScript**.

[![npm version](https://img.shields.io/npm/v/nepali-date-picker-converter.svg)](https://www.npmjs.com/package/nepali-date-picker-converter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🔄 **Bidirectional Conversion** - Convert between Nepali (BS) and English (AD) dates
- 📅 **Beautiful Date Picker** - Interactive React component with calendar UI
- 🎯 **Type-Safe** - Full TypeScript support
- 📦 **Lightweight** - Framework-agnostic core library
- 🌐 **Multi-Framework** - Works with React, Angular, PHP, Laravel, and vanilla JS
- 🎨 **Customizable** - Theme support and styling options
- 🇳🇵 **Nepali Support** - Nepali numerals and language support
- 📊 **Accurate** - Supports dates from 2000 BS to 2099 BS (1943 AD to 2043 AD)

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
<script src="https://unpkg.com/nepali-date-picker-converter@0.1.4/dist/bundle.umd.js"></script>
```

#### Full UI Component (Requires React)

```html
<!-- Dependencies -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Library & Styles -->
<script src="https://unpkg.com/nepali-date-picker-converter@0.1.4/dist/bundle.react.umd.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/nepali-date-picker-converter@0.1.4/dist/bundle.react.umd.css"
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
    onChange: (date) => console.log("Selected:", date),
    theme: { primary: "#2563eb" },
  });
</script>
```

### React Component

```tsx
import React, { useState } from "react";
import { NepaliDatePicker } from "nepali-date-picker-converter";
import "nepali-date-picker-converter/dist/bundle.react.umd.css";

function App() {
  const [date, setDate] = useState(null);

  return (
    <NepaliDatePicker
      onChange={(result) => setDate(result)}
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

### React Component Props

```typescript
interface NepaliDatePickerProps {
  onChange?: (result: DatePickerResult | null) => void;
  theme?: Theme;
  value?: string; // "YYYY-MM-DD"
  dateLan?: "en" | "np";
  monthLan?: "en" | "np";
  dayLan?: "en" | "np";
  yearLan?: "en" | "np";
}
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
  } from "https://unpkg.com/nepali-date-picker-converter@0.1.4/dist/index.js";
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
