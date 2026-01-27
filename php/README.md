# PHP & Laravel Guide

Comprehensive guide for integrating Nepali date features (UI and logic) into PHP and Laravel projects.

## 🚀 Two Ways to Integrate

1. **Client-Side (CDN)**: Best for adding the interactive Date Picker UI to your forms.
2. **Server-Side (PHP Class)**: Best for backend logic, report generation, and database conversions.

---

## 🎨 Client-Side: Interaction & UI

This method uses the library's JavaScript UMD bundle to mount the React-based date picker onto any standard HTML element. **No React knowledge is required.**

### 1. Load Dependencies in your HTML

```html
<!-- React Dependencies (Required) -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Nepali Date Picker & Styles (v0.1.28) -->
<script src="https://unpkg.com/nepali-date-picker-converter@0.1.28/dist/bundle.react.umd.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/nepali-date-picker-converter@0.1.28/dist/bundle.react.umd.css"
/>
```

### 2. Integration with PHP Forms

To send the selected date back to your PHP backend, use a **hidden input** that gets updated whenever the user selects a date.

```html
<form action="/save-date.php" method="POST">
  <label>Select Date:</label>

  <!-- 1. The visible target for the picker -->
  <div id="nepali-picker-container" style="max-width: 300px;"></div>

  <!-- 2. The hidden input your PHP script will receive -->
  <input type="hidden" name="nepali_date" id="selected-bs-date" />

  <button type="submit">Submit Form</button>
</form>

<script>
  const { mountNepaliDatePicker } = window.NepaliDatePickerConverter;

  mountNepaliDatePicker("#nepali-picker-container", {
    // 🔥 New features in 0.1.24
    inputClassName: "form-control", // Add Bootstrap classes directly
    placeholder: "Select Date BS",
    max: "2082-12-30", // Disable future dates
    min: "2080-01-01", // Disable past dates

    onChange: (result) => {
      if (result) {
        // result.bs is always an ASCII string (e.g. "2082-10-15")
        // making it safe for database storage and back-end logic.
        document.getElementById("selected-bs-date").value = result.bs;
      }
    },
    theme: { primary: "#2563eb", radius: "8px" },
  });
</script>
```

### 3. Language & Toggle (New)

You can control the default language and show the interactive language switcher button:

```javascript
mountNepaliDatePicker("#picker", {
  // 1. Set default language ('en' or 'np')
  language: "np",

  // 2. Show the "ने / EN" toggle button in the header
  showLanguageSwitcher: true,

  // Optional: individual control
  monthLan: "np",
});
```

### 4. Two-Way Synchronization (New)

You can now keep an English date input and the Nepali picker in sync using the `setValue` method and `adToBs` converter.

```javascript
const adInput = document.getElementById("ad-input");
const { mountNepaliDatePicker, adToBs } = window.NepaliDatePickerConverter;

const picker = mountNepaliDatePicker("#picker", {
  onChange: (res) => {
    if (res) adInput.value = res.ad.toISOString().split("T")[0];
  },
});

adInput.addEventListener("change", (e) => {
  const bs = adToBs(new Date(e.target.value));
  const bsStr = `${bs.year}-${String(bs.month).padStart(2, "0")}-${String(bs.day).padStart(2, "0")}`;

  // 🔥 Update the picker programmatically
  picker.setValue(bsStr);
});
```

---

## ⚙️ Server-Side: Logic & Conversion

If you need to handle conversions on your server (e.g., converting stored BS dates to AD before saving to a SQL database), use the provided PHP helper class. It now includes the **full 100-year calendar data (2000-2099 BS)**.

### 1. Setup

Copy [NepaliDateConverter.php](./NepaliDateConverter.php) to your project.

- **Plain PHP**: `require_once 'NepaliDateConverter.php';`
- **Laravel**: Place it in `app/Helpers/` and ensure your `composer.json` autoloads it, or simply use namespacing.

### 2. Method Reference

| Method                    | Description       | Input                       | Output                                    |
| :------------------------ | :---------------- | :-------------------------- | :---------------------------------------- |
| `adToBs($date)`           | English to Nepali | `DateTime` or `string`      | `['year'=>int, 'month'=>int, 'day'=>int]` |
| `bsToAd($yOrStr, $m, $d)` | Nepali to English | `int` year OR `string` date | `DateTime` object                         |
| `formatBs($array, $f)`    | Format BS array   | `bsArray`, format string    | `string` (e.g. "2081-10-07")              |

### 3. Practical Laravel Storage Pattern

**Storing in Database (AD is better for sorting/indexing):**

```php
use App\Helpers\NepaliDateConverter;

public function store(Request $request) {
    $bsDate = $request->input('nepali_date'); // "2081-10-07"

    if ($bsDate) {
        // 🔥 New in 0.1.24: Pass the whole string directly
        $dateAD = NepaliDateConverter::bsToAd($bsDate);

        // Save to your model
        $event = new Event();
        $event->event_date_ad = $dateAD;
        $event->save();
    }
}
```

---

## 🏗️ Laravel Best Practice: Blade Component

Create a reusable Blade component for the date picker.

**1. Create `resources/views/components/nepali-datepicker.blade.php`:**

```html
@props(['name', 'value' => ''])

<div class="nepali-datepicker-wrapper">
  <div id="picker-{{ $name }}"></div>
  <input
    type="hidden"
    name="{{ $name }}"
    id="input-{{ $name }}"
    value="{{ $value }}"
  />
</div>

@push('scripts')
<script>
  window.addEventListener("load", () => {
    window.NepaliDatePickerConverter.mountNepaliDatePicker(
      "#picker-{{ $name }}",
      {
        value: "{{ $value }}",
        onChange: (res) => {
          document.getElementById("input-{{ $name }}").value = res
            ? res.bs
            : "";
        },
      },
    );
  });
</script>
@endpush
```

**2. Use it in your forms:**

```html
<x-nepali-datepicker name="joining_date" value="2081-01-01" />
```

---

## 🛠️ Complete Single-File Demo

```php
<?php
require_once 'NepaliDateConverter.php';
$sampleBS = "2081-05-15";
[$y, $m, $d] = explode('-', $sampleBS);
$ad = NepaliDateConverter::bsToAd((int)$y, (int)$m, (int)$d);
?>
<!DOCTYPE html>
<html>
<head>
    <title>PHP Nepali Date Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/nepali-date-picker-converter@0.1.28/dist/bundle.react.umd.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/nepali-date-picker-converter@0.1.28/dist/bundle.react.umd.css">
</head>
<body>
    <h1>Nepali Date Integration</h1>

    <p>Server-side check: <b><?php echo $sampleBS; ?></b> is <b><?php echo $ad->format('M d, Y'); ?></b></p>

    <div id="picker"></div>
    <script>
        window.NepaliDatePickerConverter.mountNepaliDatePicker("#picker", {
            onChange: (res) => console.log(res)
        });
    </script>
</body>
</html>
```
