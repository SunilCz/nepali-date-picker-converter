<?php

/**
 * Nepali Date Converter for PHP/Laravel
 * Converts between Nepali (Bikram Sambat) and English (Gregorian) dates
 */

class NepaliDateConverter
{
    private const NP_INITIAL_YEAR = 1970;
    private const AD_REFERENCE = '1913-04-13';

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
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 1970 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1971 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1972 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1973 BS
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 1974 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1975 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1976 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1977 BS
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 1978 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1979 BS
            [31, 31, 32, 32, 31, 30, 29, 30, 30, 29, 30, 30], // 1980 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1981 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 1982 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1983 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1984 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1985 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 1986 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1987 BS
            [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1988 BS
            [31, 32, 31, 32, 31, 30, 30, 29, 29, 29, 30, 31], // 1989 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 1990 BS
            [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1991 BS
            [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1992 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 1993 BS
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 1994 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1995 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 1996 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 1997 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1998 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],  // 1999 BS
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2000 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2001 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2002 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2003 BS
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2004 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2005 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2006 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2007 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2008 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2009 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2010 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2011 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2012 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2013 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2014 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2015 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2016 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2017 BS
            [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2018 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2019 BS
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2020 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2021 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2022 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2023 BS
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2024 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2025 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2026 BS
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2027 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2028 BS
            [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], // 2029 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2030 BS
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2031 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2032 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2033 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2034 BS
            [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2035 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2036 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2037 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2038 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2039 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2040 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2041 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2042 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2043 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2044 BS
            [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2045 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2046 BS
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2047 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2048 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2049 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2050 BS
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2051 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2052 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2053 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2054 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2055 BS
            [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], // 2056 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2057 BS
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2058 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2059 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2060 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2061 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31], // 2062 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2063 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2064 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2065 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2066 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2067 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2068 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2069 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2070 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2071 BS
            [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2072 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2073 BS
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2074 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2075 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2076 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2077 BS
            [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2078 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2079 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2080 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2081 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2082 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2083 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2084 BS
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2085 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2086 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2087 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2088 BS
            [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2089 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2090 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2091 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2092 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2093 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2094 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2095 BS
            [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2096 BS
            [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2097 BS
            [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2098 BS
            [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2099 BS
        ];
    }
}
