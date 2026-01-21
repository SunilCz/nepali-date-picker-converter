# Angular Integration

You can integrate the Nepali Date library into Angular using the **npm package** (for logic) or the **CDN/Vanilla helper** (for the UI component).

## Option 1: npm Package (Best for Logic)

### 1. Installation

```bash
npm install nepali-date-picker-converter
```

### 2. Using the Service

The package includes an Angular service for easy conversion.

```typescript
import { Component, OnInit } from "@angular/core";
import { NepaliDateService } from "nepali-date-picker-converter/angular/nepali-date.service";

@Component({
  selector: "app-root",
  template: `
    <p>BS Date: {{ todayBS.year }}-{{ todayBS.month }}-{{ todayBS.day }}</p>
  `,
})
export class AppComponent implements OnInit {
  todayBS: any;

  constructor(private nepaliDateService: NepaliDateService) {}

  ngOnInit() {
    this.todayBS = this.nepaliDateService.todayBs();
  }
}
```

---

## Option 2: UI Component (CDN / Vanilla Helper)

Since the UI component is built with React, the easiest way to use it in Angular is via the `mountNepaliDatePicker` helper.

### 1. Load Dependencies in `src/index.html`

```html
<!-- Dependencies -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Library & Styles (v0.1.19) -->
<script src="https://unpkg.com/nepali-date-picker-converter@0.1.19/dist/bundle.react.umd.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/nepali-date-picker-converter@0.1.19/dist/bundle.react.umd.css"
/>
```

### 2. Use in your Component

```typescript
import { Component, AfterViewInit, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-date-picker",
  template: "<div #pickerContainer></div>",
})
export class DatePickerComponent implements AfterViewInit {
  @ViewChild("pickerContainer") pickerContainer!: ElementRef;

  ngAfterViewInit() {
    // Access the global helper
    const { mountNepaliDatePicker } = (window as any).NepaliDatePickerConverter;

    mountNepaliDatePicker(this.pickerContainer.nativeElement, {
      onChange: (date: any) => {
        console.log("Selected Date:", date);
      },
      theme: { primary: "#2563eb" },
    });
  }
}
```

---

## Supported Date Range

- **BS**: 2000 to 2099
- **AD**: 1943 to 2043
