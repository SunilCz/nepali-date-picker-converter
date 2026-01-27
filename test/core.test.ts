/**
 * Test script for core Nepali Date Converter functions
 * Run with: npm run test:core
 * 
 * Note: This test only imports core functions (not React component)
 */

// Import only core functions to avoid React dependency
import { adToBs, bsToAd, formatBs, formatAd } from '../src/core/converter';
import { NepaliDate } from '../src/core/NepaliDate';
import { toNepaliNumeral } from '../src/utils/formatter';

console.log('🧪 Testing Nepali Date Converter Core Functions\n');
console.log('='.repeat(50));

// Test 1: AD to BS conversion
console.log('\n1️⃣  Testing AD to BS Conversion:');
try {
  const testDate1 = new Date(2024, 0, 15); // Jan 15, 2024
  const bsDate1 = adToBs(testDate1);
  console.log(`   Input: ${testDate1.toISOString().split('T')[0]} (AD)`);
  console.log(`   Output: ${bsDate1.year}-${bsDate1.month}-${bsDate1.day} (BS)`);
  console.log(`   ✅ Success`);
} catch (error) {
  console.log(`   ❌ Error: ${error}`);
}

// Test 2: BS to AD conversion
console.log('\n2️⃣  Testing BS to AD Conversion:');
try {
  const bsYear = 2080;
  const bsMonth = 10;
  const bsDay = 15;
  const adDate = bsToAd(bsYear, bsMonth, bsDay);
  console.log(`   Input: ${bsYear}-${bsMonth}-${bsDay} (BS)`);
  console.log(`   Output: ${adDate.toISOString().split('T')[0]} (AD)`);
  console.log(`   ✅ Success`);
} catch (error) {
  console.log(`   ❌ Error: ${error}`);
}

// Test 3: Round trip conversion
console.log('\n3️⃣  Testing Round Trip Conversion:');
try {
  const originalDate = new Date(2024, 5, 15); // June 15, 2024
  const bsDate = adToBs(originalDate);
  const convertedBack = bsToAd(bsDate.year, bsDate.month, bsDate.day);
  const isSame = originalDate.toDateString() === convertedBack.toDateString();
  console.log(`   Original AD: ${originalDate.toISOString().split('T')[0]}`);
  console.log(`   Converted to BS: ${bsDate.year}-${bsDate.month}-${bsDate.day}`);
  console.log(`   Converted back to AD: ${convertedBack.toISOString().split('T')[0]}`);
  console.log(`   Round trip match: ${isSame ? '✅ Yes' : '❌ No'}`);
} catch (error) {
  console.log(`   ❌ Error: ${error}`);
}

// Test 4: Format BS date
console.log('\n4️⃣  Testing BS Date Formatting:');
try {
  const bsDate = { year: 2080, month: 10, day: 15 };
  const formatted1 = formatBs(bsDate, 'YYYY-MM-DD');
  const formatted2 = formatBs(bsDate, 'DD-MM-YYYY');
  const formatted3 = formatBs(bsDate, 'DD/MM/YYYY');
  console.log(`   Date: ${bsDate.year}-${bsDate.month}-${bsDate.day}`);
  console.log(`   YYYY-MM-DD: ${formatted1}`);
  console.log(`   DD-MM-YYYY: ${formatted2}`);
  console.log(`   DD/MM/YYYY: ${formatted3}`);
  console.log(`   ✅ Success`);
} catch (error) {
  console.log(`   ❌ Error: ${error}`);
}

// Test 5: Format AD date
console.log('\n5️⃣  Testing AD Date Formatting:');
try {
  const adDate = new Date(2024, 0, 15);
  const formatted1 = formatAd(adDate, 'YYYY-MM-DD');
  const formatted2 = formatAd(adDate, 'DD-MM-YYYY');
  console.log(`   Date: ${adDate.toISOString().split('T')[0]}`);
  console.log(`   YYYY-MM-DD: ${formatted1}`);
  console.log(`   DD-MM-YYYY: ${formatted2}`);
  console.log(`   ✅ Success`);
} catch (error) {
  console.log(`   ❌ Error: ${error}`);
}

// Test 6: NepaliDate class
console.log('\n6️⃣  Testing NepaliDate Class:');
try {
  const nepaliDate = NepaliDate.today();
  console.log(`   Today in BS: ${nepaliDate.getYear()}-${nepaliDate.getMonth()}-${nepaliDate.getDate()}`);
  console.log(`   Formatted: ${nepaliDate.format('YYYY-MM-DD')}`);
  console.log(`   To AD: ${nepaliDate.toAD().toISOString().split('T')[0]}`);
  console.log(`   ✅ Success`);
} catch (error) {
  console.log(`   ❌ Error: ${error}`);
}

// Test 7: Nepali Numeral conversion
console.log('\n7️⃣  Testing Nepali Numeral Conversion:');
try {
  const englishNum = '2080-10-15';
  const nepaliNum = toNepaliNumeral(englishNum);
  console.log(`   English: ${englishNum}`);
  console.log(`   Nepali:  ${nepaliNum}`);
  console.log(`   ✅ Success`);
} catch (error) {
  console.log(`   ❌ Error: ${error}`);
}

// Test 8: Edge cases
console.log('\n8️⃣  Testing Edge Cases:');
try {
  // Test first day of Nepali calendar (1970-01-01)
  const firstBS = bsToAd(1970, 1, 1);
  console.log(`   First BS date (1970-01-01) = ${firstBS.toISOString().split('T')[0]} (AD)`);
  
  // Test previous epoch (2000-01-01)
  const epoch2000 = bsToAd(2000, 1, 1);
  console.log(`   2000-01-01 BS = ${epoch2000.toISOString().split('T')[0]} (AD)`);
  
  // Test today
  const today = new Date();
  const todayBS = adToBs(today);
  console.log(`   Today (AD): ${today.toISOString().split('T')[0]}`);
  console.log(`   Today (BS): ${todayBS.year}-${todayBS.month}-${todayBS.day}`);
  console.log(`   ✅ Success`);
} catch (error) {
  console.log(`   ❌ Error: ${error}`);
}

console.log('\n' + '='.repeat(50));
console.log('✨ All core tests completed!\n');
