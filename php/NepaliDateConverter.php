<?php

/**
 * Nepali Date Converter for PHP/Laravel
 * Converts between Nepali (Bikram Sambat) and English (Gregorian) dates
 */

class NepaliDateConverter
{
    private const NP_INITIAL_YEAR = 2000;
    private const AD_REFERENCE = '1943-04-14';

    /**
     * Convert English (AD) date to Nepali (BS) date
     * 
     * @param DateTime|string $adDate English date (DateTime object or date string)
     * @return array Array with 'year', 'month', and 'day' keys
     */
    public static function adToBs($adDate): array
    {
        if (is_string($adDate)) {
            $adDate = new DateTime($adDate);
        }

        if (!($adDate instanceof DateTime)) {
            throw new InvalidArgumentException("Invalid AD date");
        }

        // Normalize to UTC midnight
        $adDate->setTime(0, 0, 0);
        $reference = new DateTime(self::AD_REFERENCE);
        $reference->setTime(0, 0, 0);

        $diff = $adDate->diff($reference);
        $totalDays = (int) $diff->days;

        if ($totalDays < 0) {
            throw new InvalidArgumentException("AD date is before supported Nepali calendar range");
        }

        $yearData = self::getNepaliMonthsData();
        $bsYear = self::NP_INITIAL_YEAR;
        $yearIndex = 0;

        while ($yearIndex < count($yearData)) {
            $yearDays = array_sum($yearData[$yearIndex]);

            if ($totalDays < $yearDays) {
                break;
            }

            $totalDays -= $yearDays;
            $yearIndex++;
            $bsYear++;
        }

        if ($yearIndex >= count($yearData)) {
            throw new InvalidArgumentException("BS year out of supported range");
        }

        $monthsData = $yearData[$yearIndex];
        $bsMonth = 1;

        for ($i = 0; $i < 12; $i++) {
            if ($totalDays < $monthsData[$i]) {
                break;
            }
            $totalDays -= $monthsData[$i];
            $bsMonth++;
        }

        return [
            'year' => $bsYear,
            'month' => $bsMonth,
            'day' => $totalDays + 1
        ];
    }

    /**
     * Convert Nepali (BS) date to English (AD) date
     * 
     * @param int $bsYear Nepali year
     * @param int $bsMonth Nepali month (1-12)
     * @param int $bsDay Nepali day
     * @return DateTime English date as DateTime object
     */
    public static function bsToAd(int $bsYear, int $bsMonth, int $bsDay): DateTime
    {
        $yearIndex = $bsYear - self::NP_INITIAL_YEAR;
        $yearData = self::getNepaliMonthsData();

        if (!isset($yearData[$yearIndex])) {
            throw new InvalidArgumentException("BS year out of supported range");
        }

        $totalDays = 0;

        // Add days from previous years
        for ($y = 0; $y < $yearIndex; $y++) {
            $totalDays += array_sum($yearData[$y]);
        }

        $months = $yearData[$yearIndex];

        // Add days from previous months in the same year
        for ($m = 0; $m < $bsMonth - 1; $m++) {
            $totalDays += $months[$m];
        }

        $totalDays += $bsDay - 1;

        $adDate = new DateTime(self::AD_REFERENCE);
        $adDate->modify("+{$totalDays} days");

        return $adDate;
    }

    /**
     * Format BS date as string
     * 
     * @param array $bsDate Array with 'year', 'month', 'day' keys
     * @param string $format Date format (YYYY-MM-DD, DD-MM-YYYY, etc.)
     * @return string Formatted date string
     */
    public static function formatBs(array $bsDate, string $format = 'YYYY-MM-DD'): string
    {
        $year = str_pad($bsDate['year'], 4, '0', STR_PAD_LEFT);
        $month = str_pad($bsDate['month'], 2, '0', STR_PAD_LEFT);
        $day = str_pad($bsDate['day'], 2, '0', STR_PAD_LEFT);

        $formatted = str_replace(['YYYY', 'MM', 'DD'], [$year, $month, $day], $format);

        return $formatted;
    }

    /**
     * Format AD date as string
     * 
     * @param DateTime $adDate English date
     * @param string $format Date format
     * @return string Formatted date string
     */
    public static function formatAd(DateTime $adDate, string $format = 'YYYY-MM-DD'): string
    {
        $year = $adDate->format('Y');
        $month = $adDate->format('m');
        $day = $adDate->format('d');

        $formatted = str_replace(['YYYY', 'MM', 'DD'], [$year, $month, $day], $format);

        return $formatted;
    }

    /**
     * Get Nepali months data
     * This should match the TypeScript NP_MONTHS_DATA
     * 
     * @return array Array of arrays, each containing 12 months' day counts
     */
    private static function getNepaliMonthsData(): array
    {
        // This is a simplified version - you may need to include full data
        // For production, consider loading from a JSON file or database
        return [
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2000 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2001 BS
            // ... Add remaining years (2000-2099)
            // Note: Full data should be added here or loaded from external source
        ];
    }
}
