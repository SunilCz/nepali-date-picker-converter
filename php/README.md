# PHP / Laravel Integration

This library provides flexible ways to integrate Nepali date features into PHP and Laravel projects.

## Option 1: CDN (Recommended for UI & Converter)

Use this if you want to add the **Date Picker UI** or use JavaScript-based conversion on the client side.

### 1. Add Scripts to your template (Blade or regular PHP)

Include these in your `<head>` or before `</body>`:

```html
<!-- Dependencies (React 18) -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Library & Styles (v0.1.9) -->
<script src="https://unpkg.com/nepali-date-picker-converter@0.1.9/dist/bundle.react.umd.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/nepali-date-picker-converter@0.1.9/dist/bundle.react.umd.css"
/>
```

### 2. Initialize the Picker (No React needed)

Add a target `div` and call the mounting helper:

```html
<div id="nepali-datepicker"></div>

<script>
  const { mountNepaliDatePicker } = window.NepaliDatePickerConverter;

  // Simple vanilla JS call
  mountNepaliDatePicker("#nepali-datepicker", {
    onChange: (date) => {
      console.log("Selected Date:", date);
      // Update a hidden input for form submission
      if (date) {
        document.getElementById("date_input").value = date.bs;
      }
    },
    theme: { primary: "#2563eb" },
  });
</script>
```

---

## Option 2: Core PHP Helper (Server-Side)

Use this if you need to convert dates directly in your PHP/Laravel backend.

### 1. Installation

Copy the `NepaliDateConverter.php` file from this directory into your project (e.g., `app/Helpers/` in Laravel).

### 2. Usage in PHP

```php
<?php
require_once 'NepaliDateConverter.php';

// AD to BS
$bs = NepaliDateConverter::adToBs(new DateTime('2024-01-15'));
echo $bs['year'] . '-' . $bs['month'] . '-' . $bs['day']; // 2080-10-2

// BS to AD
$ad = NepaliDateConverter::bsToAd(2080, 10, 15);
echo $ad->format('Y-m-d'); // 2024-01-29
```

### 3. Usage in Laravel Controller

```php
use App\Helpers\NepaliDateConverter;

public function store(Request $request) {
    $bsDate = $request->input('nepali_date'); // e.g. "2080-10-15"
    if ($bsDate) {
        [$y, $m, $d] = explode('-', $bsDate);
        // Store equivalent AD date
        $adDate = NepaliDateConverter::bsToAd((int)$y, (int)$m, (int)$d);
        $record->update(['date_ad' => $adDate]);
    }
}
```

## Supported Date Range

- **BS**: 2000 to 2099
- **AD**: 1943 to 2043
