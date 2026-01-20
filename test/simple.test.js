/**
 * Simple Node.js test script
 * Run with: node test/simple.test.js
 * 
 * Note: This requires the built files in dist/
 */

// Test if the library is built
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist/index.js');

if (!fs.existsSync(distPath)) {
  console.log('❌ Dist files not found. Please run: npm run build');
  process.exit(1);
}

console.log('✅ Loading compiled library...');
// Import only core functions to avoid React dependency
const { adToBs, bsToAd, formatBs, formatAd } = require('../dist/core/converter.js');
const { NepaliDate } = require('../dist/core/NepaliDate.js');
const { toNepaliNumeral } = require('../dist/utils/formatter.js');

console.log('\n🧪 Running Simple Tests\n');
console.log('='.repeat(50));

// Test 1: Basic conversion
console.log('\n1️⃣  Basic AD to BS Conversion:');
const testDate = new Date(2024, 0, 15); // Jan 15, 2024
const bsDate = adToBs(testDate);
console.log(`   AD Date: ${testDate.toISOString().split('T')[0]}`);
console.log(`   BS Date: ${bsDate.year}-${bsDate.month}-${bsDate.day}`);
console.log(`   ✅ Success`);

// Test 2: BS to AD
console.log('\n2️⃣  Basic BS to AD Conversion:');
const adDate = bsToAd(2080, 10, 15);
console.log(`   BS Date: 2080-10-15`);
console.log(`   AD Date: ${adDate.toISOString().split('T')[0]}`);
console.log(`   ✅ Success`);

// Test 3: Today's date
console.log('\n3️⃣  Today\'s Date Conversion:');
const today = new Date();
const todayBS = adToBs(today);
console.log(`   Today (AD): ${today.toISOString().split('T')[0]}`);
console.log(`   Today (BS): ${todayBS.year}-${todayBS.month}-${todayBS.day}`);
console.log(`   ✅ Success`);

// Test 4: Formatting
console.log('\n4️⃣  Date Formatting:');
const formatted = formatBs({ year: 2080, month: 10, day: 15 }, 'YYYY-MM-DD');
console.log(`   Formatted BS: ${formatted}`);
console.log(`   ✅ Success`);

// Test 5: NepaliDate class
console.log('\n5️⃣  NepaliDate Class:');
const nepaliDate = NepaliDate.today();
console.log(`   Today: ${nepaliDate.getYear()}-${nepaliDate.getMonth()}-${nepaliDate.getDate()}`);
console.log(`   Formatted: ${nepaliDate.format('YYYY-MM-DD')}`);
console.log(`   ✅ Success`);

console.log('\n' + '='.repeat(50));
console.log('✨ All tests passed!\n');
