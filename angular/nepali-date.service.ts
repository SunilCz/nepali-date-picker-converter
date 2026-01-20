/**
 * Angular Service for Nepali Date Conversion
 * 
 * Usage:
 * 1. Import this service in your Angular module
 * 2. Inject it in your components
 * 
 * Example:
 * constructor(private nepaliDateService: NepaliDateService) {}
 * 
 * const bsDate = this.nepaliDateService.adToBs(new Date());
 * const adDate = this.nepaliDateService.bsToAd(2080, 10, 15);
 */

import { Injectable } from '@angular/core';
import { adToBs, bsToAd, formatBs, formatAd } from '../dist/index';

export interface BSDate {
  year: number;
  month: number;
  day: number;
}

@Injectable({
  providedIn: 'root'
})
export class NepaliDateService {
  
  /**
   * Convert English (AD) date to Nepali (BS) date
   * @param adDate JavaScript Date object
   * @returns BSDate object with year, month, day
   */
  adToBs(adDate: Date): BSDate {
    return adToBs(adDate);
  }

  /**
   * Convert Nepali (BS) date to English (AD) date
   * @param bsYear Nepali year
   * @param bsMonth Nepali month (1-12)
   * @param bsDay Nepali day
   * @returns JavaScript Date object
   */
  bsToAd(bsYear: number, bsMonth: number, bsDay: number): Date {
    return bsToAd(bsYear, bsMonth, bsDay);
  }

  /**
   * Format BS date as string
   * @param bsDate BSDate object
   * @param format Date format (default: 'YYYY-MM-DD')
   * @returns Formatted date string
   */
  formatBs(bsDate: BSDate, format: string = 'YYYY-MM-DD'): string {
    return formatBs(bsDate, format as any);
  }

  /**
   * Format AD date as string
   * @param adDate JavaScript Date object
   * @param format Date format (default: 'YYYY-MM-DD')
   * @returns Formatted date string
   */
  formatAd(adDate: Date, format: string = 'YYYY-MM-DD'): string {
    return formatAd(adDate, format as any);
  }

  /**
   * Get today's date in BS
   * @returns BSDate object
   */
  todayBs(): BSDate {
    return this.adToBs(new Date());
  }
}
