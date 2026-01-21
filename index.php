<!DOCTYPE html>
<html lang="en">

<head>
    <title>Local Test</title>
    <!-- React Dependencies -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

    <!-- POINT TO LOCAL DIST FOLDER -->
    <script src="./dist/bundle.react.umd.js"></script>
    <link rel="stylesheet" href="./dist/bundle.react.umd.css" />
</head>

<body>
    <div id="picker"></div>
    <script>
        const { mountNepaliDatePicker } = window.NepaliDatePickerConverter;

        const picker = mountNepaliDatePicker("#picker", {
            showLanguageSwitcher: true,
            language: 'np' // Start in Nepali
        });

        // Simulate an external update (like from your PHP sync logic)
        setTimeout(() => {
            console.log("Simulating sync update...");
            // This used to reset the language back to 'np' even if you switched to 'en'
            picker.setValue("2082-01-01");
        }, 5000);
    </script>
</body>

</html>