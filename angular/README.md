# Angular Integration

This directory contains Angular service and component examples for using the Nepali Date Converter.

## Installation

```bash
npm install nepali-date-picker-converter
```

## Using the Service

The service is provided with `providedIn: 'root'`, so you can inject it directly in any component.

### Example Component

```typescript
import { Component, OnInit } from '@angular/core';
import { NepaliDateService } from 'nepali-date-picker-converter/angular/nepali-date.service';

@Component({
  selector: 'app-date-converter',
  template: `
    <div class="container">
      <h2>Nepali Date Converter</h2>
      
      <div class="today-section">
        <h3>Today's Date</h3>
        <p>English (AD): {{ todayAD }}</p>
        <p>Nepali (BS): {{ todayBS.year }}-{{ todayBS.month }}-{{ todayBS.day }}</p>
        <p>Formatted: {{ formattedDate }}</p>
      </div>

      <div class="converter-section">
        <h3>Convert Date</h3>
        <input type="date" [(ngModel)]="adDateInput" (change)="convertADtoBS()" />
        <div *ngIf="convertedBS">
          <p>BS Date: {{ convertedBS.year }}-{{ convertedBS.month }}-{{ convertedBS.day }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .today-section, .converter-section {
      margin: 20px 0;
      padding: 20px;
      background: #f9fafb;
      border-radius: 8px;
    }
  `]
})
export class DateConverterComponent implements OnInit {
  todayBS: any;
  todayAD: string = '';
  formattedDate: string = '';
  adDateInput: string = '';
  convertedBS: any = null;

  constructor(private nepaliDateService: NepaliDateService) {}

  ngOnInit() {
    // Get today's date
    this.todayBS = this.nepaliDateService.todayBs();
    this.todayAD = new Date().toISOString().split('T')[0];
    this.formattedDate = this.nepaliDateService.formatBs(this.todayBS);
  }

  convertADtoBS() {
    if (this.adDateInput) {
      const date = new Date(this.adDateInput);
      this.convertedBS = this.nepaliDateService.adToBs(date);
    }
  }
}
```

## Direct Import (Alternative)

You can also import the core functions directly without using the service:

```typescript
import { Component } from '@angular/core';
import { adToBs, bsToAd } from 'nepali-date-picker-converter';

@Component({
  selector: 'app-date-example',
  template: `...`
})
export class DateExampleComponent {
  convertDate() {
    const bsDate = adToBs(new Date(2024, 0, 15));
    const adDate = bsToAd(2080, 10, 15);
    console.log('BS:', bsDate);
    console.log('AD:', adDate);
  }
}
```

## Building Custom Angular Date Picker

If you want to build a custom Angular date picker component, you can use the converter functions:

```typescript
import { Component, EventEmitter, Output } from '@angular/core';
import { adToBs, bsToAd, formatBs } from 'nepali-date-picker-converter';

@Component({
  selector: 'app-nepali-date-picker',
  template: `
    <div class="date-picker">
      <!-- Your custom calendar UI here -->
      <!-- Use adToBs() and bsToAd() for conversions -->
    </div>
  `
})
export class NepaliDatePickerComponent {
  @Output() dateChange = new EventEmitter<any>();

  selectDate(year: number, month: number, day: number) {
    const adDate = bsToAd(year, month, day);
    const formatted = formatBs({ year, month, day }, 'YYYY-MM-DD');
    
    this.dateChange.emit({
      bs: `${year}-${month}-${day}`,
      ad: adDate,
      nepali: formatted
    });
  }
}
```

## Notes

- The React DatePicker component can't be used directly in Angular
- Use the service or import core functions for conversions
- Build your own UI components using the converter functions
- All core functions work the same as in React/vanilla JS

## API Reference

### NepaliDateService Methods

- `adToBs(adDate: Date): BSDate` - Convert AD to BS
- `bsToAd(bsYear: number, bsMonth: number, bsDay: number): Date` - Convert BS to AD
- `formatBs(bsDate: BSDate, format?: string): string` - Format BS date
- `formatAd(adDate: Date, format?: string): string` - Format AD date
- `todayBs(): BSDate` - Get today's date in BS

See main README.md for detailed API documentation.
