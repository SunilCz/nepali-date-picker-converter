# PHP / Laravel Integration

This directory contains PHP helper class for converting between Nepali (BS) and English (AD) dates.

## Installation

Copy the `NepaliDateConverter.php` file to your PHP project or Laravel app.

### For Laravel

1. Copy `NepaliDateConverter.php` to `app/Helpers/` directory
2. Add to `composer.json` autoload:

```json
{
  "autoload": {
    "files": [
      "app/Helpers/NepaliDateConverter.php"
    ]
  }
}
```

3. Run: `composer dump-autoload`

## Usage

### Basic Conversion

```php
<?php
require_once 'NepaliDateConverter.php';

// Convert AD to BS
$bsDate = NepaliDateConverter::adToBs(new DateTime('2024-01-15'));
echo $bsDate['year'] . '-' . $bsDate['month'] . '-' . $bsDate['day'];
// Output: 2080-10-2

// Convert BS to AD
$adDate = NepaliDateConverter::bsToAd(2080, 10, 15);
echo $adDate->format('Y-m-d');
// Output: 2024-01-29
```

### In Laravel Controller

```php
<?php

namespace App\Http\Controllers;

use App\Helpers\NepaliDateConverter;
use Illuminate\Http\Request;

class DateController extends Controller
{
    public function convertDate(Request $request)
    {
        $adDate = new \DateTime($request->input('date'));
        $bsDate = NepaliDateConverter::adToBs($adDate);
        
        return response()->json([
            'bs' => $bsDate['year'] . '-' . $bsDate['month'] . '-' . $bsDate['day'],
            'ad' => $adDate->format('Y-m-d')
        ]);
    }
    
    public function getToday()
    {
        $today = new \DateTime();
        $todayBS = NepaliDateConverter::adToBs($today);
        
        return [
            'ad' => $today->format('Y-m-d'),
            'bs' => $todayBS['year'] . '-' . $todayBS['month'] . '-' . $todayBS['day']
        ];
    }
}
```

### Date Formatting

```php
$bsDate = NepaliDateConverter::adToBs(new DateTime('2024-01-15'));

// Format BS date
$formatted = NepaliDateConverter::formatBs($bsDate, 'YYYY-MM-DD');
echo $formatted; // 2080-10-02

$formatted2 = NepaliDateConverter::formatBs($bsDate, 'DD/MM/YYYY');
echo $formatted2; // 02/10/2080
```

### Laravel Helper Function

Create a helper function in Laravel:

```php
// app/helpers.php (create if doesn't exist)

use App\Helpers\NepaliDateConverter;

if (!function_exists('ad_to_bs')) {
    function ad_to_bs($date) {
        if (is_string($date)) {
            $date = new \DateTime($date);
        }
        return NepaliDateConverter::adToBs($date);
    }
}

if (!function_exists('bs_to_ad')) {
    function bs_to_ad($year, $month, $day) {
        return NepaliDateConverter::bsToAd($year, $month, $day);
    }
}
```

Then use in your code:

```php
$bsDate = ad_to_bs('2024-01-15');
$adDate = bs_to_ad(2080, 10, 15);
```

## API Reference

### Static Methods

#### `adToBs($adDate): array`

Convert English (AD) date to Nepali (BS) date.

**Parameters:**
- `$adDate` (DateTime|string): English date

**Returns:**
- `array`: Array with `year`, `month`, and `day` keys

#### `bsToAd(int $bsYear, int $bsMonth, int $bsDay): DateTime`

Convert Nepali (BS) date to English (AD) date.

**Parameters:**
- `$bsYear` (int): Nepali year
- `$bsMonth` (int): Nepali month (1-12)
- `$bsDay` (int): Nepali day

**Returns:**
- `DateTime`: English date object

#### `formatBs(array $bsDate, string $format = 'YYYY-MM-DD'): string`

Format BS date as string.

**Parameters:**
- `$bsDate` (array): Array with `year`, `month`, `day`
- `$format` (string): Date format

**Returns:**
- `string`: Formatted date string

#### `formatAd(DateTime $adDate, string $format = 'YYYY-MM-DD'): string`

Format AD date as string.

## Supported Date Range

- **Nepali Calendar**: 2000 BS to 2099 BS
- **English Calendar**: Approximately 1943 AD to 2043 AD

## Notes

- The PHP implementation uses the same conversion logic as the TypeScript version
- All methods are static, so no instantiation needed
- DateTime objects are used for AD dates
- Arrays are used for BS dates with keys: `year`, `month`, `day`

## Error Handling

```php
try {
    $bsDate = NepaliDateConverter::adToBs(new DateTime('2024-01-15'));
} catch (InvalidArgumentException $e) {
    // Handle error
    echo "Error: " . $e->getMessage();
}
```

## Example: Date Input in Form

```php
// In your form blade file
<input type="date" name="ad_date" />

// In controller
$adDate = new \DateTime($request->input('ad_date'));
$bsDate = NepaliDateConverter::adToBs($adDate);

// Store both dates
DB::table('users')->insert([
    'ad_date' => $adDate->format('Y-m-d'),
    'bs_date' => $bsDate['year'] . '-' . $bsDate['month'] . '-' . $bsDate['day']
]);
```
