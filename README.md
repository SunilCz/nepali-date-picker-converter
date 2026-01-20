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

```bash
npm install nepali-date-picker-converter
```

For React component, also install React (if not already installed):
```bash
npm install react react-dom
```

## 🚀 Quick Start

### JavaScript/TypeScript (Core Library)

```typescript
import { adToBs, bsToAd, NepaliDate } from 'nepali-date-picker-converter';

// Convert English date to Nepali
const nepaliDate = adToBs(new Date(2024, 0, 15));
console.log(nepaliDate); 
// { year: 2080, month: 10, day: 2 }

// Convert Nepali date to English
const englishDate = bsToAd(2080, 10, 15);
console.log(englishDate); 
// Date object: 2024-01-29

// Using NepaliDate class
const today = NepaliDate.today();
console.log(today.getYear()); // 2082
console.log(today.format('YYYY-MM-DD')); // "२०८२-१०-६" (with Nepali numerals)
```

### React Component

```tsx
import React, { useState } from 'react';
import { NepaliDatePicker } from 'nepali-date-picker-converter';
import 'nepali-date-picker-converter/dist/components/styles.css';

function App() {
  const [date, setDate] = useState(null);

  return (
    <NepaliDatePicker
      onChange={(result) => {
        console.log('BS Date:', result.bs);      // "2080-10-15"
        console.log('AD Date:', result.ad);      // Date object
        console.log('Nepali Numeral:', result.nepali); // "२०८०-१०-१५"
        setDate(result);
      }}
      theme={{
        primary: '#2563eb',
        radius: '12px'
      }}
    />
  );
}
```

### Angular

```typescript
import { Component } from '@angular/core';
import { NepaliDateService } from 'nepali-date-picker-converter/angular/nepali-date.service';

@Component({
  selector: 'app-date-converter',
  template: `
    <div>
      <p>Today in BS: {{ todayBs | json }}</p>
      <p>Formatted: {{ formattedDate }}</p>
    </div>
  `
})
export class DateConverterComponent {
  todayBs: any;
  formattedDate: string = '';

  constructor(private nepaliDateService: NepaliDateService) {
    this.todayBs = this.nepaliDateService.todayBs();
    this.formattedDate = this.nepaliDateService.formatBs(this.todayBs);
  }
}
```

**Or use directly:**

```typescript
import { adToBs, bsToAd } from 'nepali-date-picker-converter';

const bsDate = adToBs(new Date(2024, 0, 15));
const adDate = bsToAd(2080, 10, 15);
```

### PHP / Laravel

```php
<?php
require_once 'path/to/NepaliDateConverter.php';

use NepaliDateConverter;

// Convert AD to BS
$bsDate = NepaliDateConverter::adToBs(new DateTime('2024-01-15'));
echo $bsDate['year'] . '-' . $bsDate['month'] . '-' . $bsDate['day'];
// Output: 2080-10-2

// Convert BS to AD
$adDate = NepaliDateConverter::bsToAd(2080, 10, 15);
echo $adDate->format('Y-m-d');
// Output: 2024-01-29

// Format BS date
$formatted = NepaliDateConverter::formatBs($bsDate, 'YYYY-MM-DD');
echo $formatted;
```

## 📚 API Reference

### Core Functions

#### `adToBs(adDate: Date): BSDate`

Converts an English (Gregorian) date to Nepali (Bikram Sambat) date.

**Parameters:**
- `adDate` (Date): JavaScript Date object

**Returns:**
- `BSDate`: Object with `year`, `month`, and `day` properties

**Example:**
```typescript
const bsDate = adToBs(new Date(2024, 0, 15));
// { year: 2080, month: 10, day: 2 }
```

#### `bsToAd(bsYear: number, bsMonth: number, bsDay: number): Date`

Converts a Nepali (Bikram Sambat) date to English (Gregorian) date.

**Parameters:**
- `bsYear` (number): Nepali year (e.g., 2080)
- `bsMonth` (number): Nepali month (1-12)
- `bsDay` (number): Nepali day (1-32)

**Returns:**
- `Date`: JavaScript Date object

**Example:**
```typescript
const adDate = bsToAd(2080, 10, 15);
// Date object representing 2024-01-29
```

#### `formatBs(date: BSDate, format?: DateFormat, displayMonth?: DisplayType, displayDay?: DisplayType): string`

Formats a BS date as a string.

**Parameters:**
- `date` (BSDate): BSDate object
- `format` (DateFormat, optional): Date format - `YYYY-MM-DD`, `DD-MM-YYYY`, `DD/MM/YYYY`, `YYYY/MM/DD`
- `displayMonth` (DisplayType, optional): `numeric`, `short`, or `long`
- `displayDay` (DisplayType, optional): `numeric`, `short`, or `long`

**Returns:**
- `string`: Formatted date string

**Example:**
```typescript
const bsDate = { year: 2080, month: 10, day: 15 };
formatBs(bsDate, 'YYYY-MM-DD'); // "२०८०-१०-१५" (Nepali numerals)
formatBs(bsDate, 'DD/MM/YYYY', 'long'); // "१५/असार/२०८०"
```

#### `formatAd(date: Date, format?: DateFormat): string`

Formats an AD date as a string.

**Parameters:**
- `date` (Date): JavaScript Date object
- `format` (DateFormat, optional): Date format

**Returns:**
- `string`: Formatted date string

#### `toNepaliNumeral(str: string | number): string`

Converts English digits to Nepali numerals.

**Example:**
```typescript
toNepaliNumeral('2080-10-15'); // "२०८०-१०-१५"
```

#### `toEnglishNumeral(str: string): string`

Converts Nepali numerals to English digits.

**Example:**
```typescript
toEnglishNumeral('२०८०-१०-१५'); // "2080-10-15"
```

### NepaliDate Class

```typescript
import { NepaliDate } from 'nepali-date-picker-converter';

// Create from current date
const nepaliDate = NepaliDate.today();

// Create from Date object
const nepaliDate2 = new NepaliDate(new Date(2024, 0, 15));

// Create from BS date
const nepaliDate3 = new NepaliDate({ year: 2080, month: 10, day: 15 });

// Get date components
nepaliDate.getYear();   // 2080
nepaliDate.getMonth();  // 10
nepaliDate.getDate();   // 15
nepaliDate.getDay();    // 3 (Wednesday, 0=Sunday)

// Format date
nepaliDate.format('YYYY-MM-DD'); // "२०८०-१०-१५"

// Convert to AD
const adDate = nepaliDate.toAD(); // Date object

// Get BS date object
const bsDate = nepaliDate.toBS(); // { year: 2080, month: 10, day: 15 }
```

### React Component Props

```typescript
interface NepaliDatePickerProps {
  /** Callback when date is selected */
  onChange?: (result: DatePickerResult | null) => void;
  
  /** Theme customization */
  theme?: Theme;
  
  /** Initial value (BS date string: YYYY-MM-DD) */
  value?: string;
  
  /** Language for date display */
  dateLan?: 'en' | 'np';
  
  /** Language for months */
  monthLan?: 'en' | 'np';
  
  /** Language for days */
  dayLan?: 'en' | 'np';
  
  /** Language for years */
  yearLan?: 'en' | 'np';
}

interface DatePickerResult {
  /** BS date string (e.g., "2080-10-15") */
  bs: string;
  
  /** Equivalent JavaScript Date object */
  ad: Date;
  
  /** Nepali numeral version (e.g., "२०८०-१०-१५") */
  nepali: string;
}

interface Theme {
  /** Main primary color (default: #2563eb) */
  primary?: string;
  
  /** Light primary color for hover (default: #eff6ff) */
  primaryLight?: string;
  
  /** Accent color */
  accent?: string;
  
  /** Border radius (default: 12px) */
  radius?: string;
  
  /** Font family */
  fontFamily?: string;
  
  /** Box shadow */
  shadow?: string;
  
  /** Input background color */
  inputBg?: string;
}
```

## 🎨 Usage Examples

### Basic Conversion

```typescript
import { adToBs, bsToAd } from 'nepali-date-picker-converter';

// Convert today's date
const today = new Date();
const todayBS = adToBs(today);
console.log(`Today in BS: ${todayBS.year}-${todayBS.month}-${todayBS.day}`);

// Convert specific BS date
const adDate = bsToAd(2080, 10, 15);
console.log(`BS 2080-10-15 = AD ${adDate.toISOString().split('T')[0]}`);
```

### React Date Picker with Custom Theme

```tsx
import { NepaliDatePicker } from 'nepali-date-picker-converter';

<NepaliDatePicker
  onChange={(result) => console.log(result)}
  theme={{
    primary: '#10b981',
    primaryLight: '#d1fae5',
    radius: '8px',
    fontFamily: 'Arial, sans-serif'
  }}
  dateLan="np"
  monthLan="np"
/>
```

### Formatting Dates

```typescript
import { formatBs, formatAd, adToBs } from 'nepali-date-picker-converter';

const today = new Date();
const bsDate = adToBs(today);

// Format BS date
formatBs(bsDate, 'YYYY-MM-DD');        // "२०८२-१०-६"
formatBs(bsDate, 'DD-MM-YYYY');        // "६-१०-२०८२"
formatBs(bsDate, 'DD/MM/YYYY', 'long'); // "६/असार/२०८२"

// Format AD date
formatAd(today, 'YYYY-MM-DD');  // "2024-01-20"
formatAd(today, 'DD-MM-YYYY');  // "20-01-2024"
```

### Using with Forms

```tsx
import { useState } from 'react';
import { NepaliDatePicker } from 'nepali-date-picker-converter';

function MyForm() {
  const [birthDate, setBirthDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (birthDate) {
      console.log('BS Date:', birthDate.bs);
      console.log('AD Date:', birthDate.ad);
      // Submit to backend...
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Birth Date (Nepali):</label>
      <NepaliDatePicker
        onChange={setBirthDate}
        value={birthDate?.bs}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 📅 Supported Date Range

- **Nepali Calendar**: 2000 BS to 2099 BS
- **English Calendar**: Approximately 1943 AD to 2043 AD
- Dates outside this range will throw an error

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- React 16.8+ for React components
- Node.js 12+ for server-side usage

## 📖 Framework-Specific Guides

### React
See React example above. Make sure to import the CSS:
```tsx
import 'nepali-date-picker-converter/dist/components/styles.css';
```

### Angular
See `angular/README.md` for detailed Angular integration guide.

### PHP/Laravel
Copy the `php/NepaliDateConverter.php` file to your project and use as shown in examples above.

### Vanilla JavaScript
```html
<script type="module">
  import { adToBs, bsToAd } from './node_modules/nepali-date-picker-converter/dist/index.js';
  
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
