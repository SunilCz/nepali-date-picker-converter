/**
 * Main test file for browser testing
 * Shows both Date Picker and Converter examples
 */

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { NepaliDatePicker, adToBs, bsToAd, formatBs, toNepaliNumeral } from 'nepali-date-picker-converter';
// Import CSS - path relative to src directory through alias
import 'nepali-date-picker-converter/components/styles.css';
import LanguageSwitcherDemo from './LanguageSwitcherDemo';

// Converter Component
const ConverterExample = () => {
  const [adInput, setAdInput] = useState('2024-01-15');
  const [bsYear, setBsYear] = useState('2080');
  const [bsMonth, setBsMonth] = useState('10');
  const [bsDay, setBsDay] = useState('15');
  const [conversionResult, setConversionResult] = useState<any>(null);
  const [todayResult, setTodayResult] = useState<any>(null);

  // Calculate today's conversion on mount
  React.useEffect(() => {
    const today = new Date();
    const todayBS = adToBs(today);
    setTodayResult({
      ad: today.toISOString().split('T')[0],
      bs: `${todayBS.year}-${todayBS.month}-${todayBS.day}`,
      formatted: formatBs(todayBS, 'YYYY-MM-DD'),
      nepali: toNepaliNumeral(`${todayBS.year}-${todayBS.month}-${todayBS.day}`)
    });
  }, []);

  const convertADtoBS = () => {
    try {
      const date = new Date(adInput);
      const bsDate = adToBs(date);
      setConversionResult({
        type: 'adToBs',
        input: adInput,
        output: `${bsDate.year}-${bsDate.month}-${bsDate.day}`,
        formatted: formatBs(bsDate, 'YYYY-MM-DD'),
        nepali: toNepaliNumeral(`${bsDate.year}-${bsDate.month}-${bsDate.day}`)
      });
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const convertBStoAD = () => {
    try {
      const year = parseInt(bsYear);
      const month = parseInt(bsMonth);
      const day = parseInt(bsDay);
      const adDate = bsToAd(year, month, day);
      setConversionResult({
        type: 'bsToAd',
        input: `${year}-${month}-${day}`,
        output: adDate.toISOString().split('T')[0],
        formatted: adDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      });
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Today's Date */}
      {todayResult && (
        <div className="result-box" style={{ marginBottom: '20px', background: '#eff6ff', borderLeft: '4px solid #2563eb' }}>
          <h3 style={{ marginTop: 0, color: '#2563eb' }}>📅 Today's Date</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
            <div>
              <p style={{ fontWeight: '600', marginBottom: '5px' }}>English (AD):</p>
              <p>{todayResult.ad}</p>
            </div>
            <div>
              <p style={{ fontWeight: '600', marginBottom: '5px' }}>Nepali (BS):</p>
              <p>{todayResult.bs}</p>
              <p style={{ fontSize: '18px', marginTop: '5px' }}>{todayResult.nepali}</p>
            </div>
          </div>
        </div>
      )}

      {/* AD to BS Converter */}
      <div className="result-box" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>🔄 Convert AD to BS</h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="date"
            value={adInput}
            onChange={(e) => setAdInput(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
          <button 
            onClick={convertADtoBS}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Convert to BS
          </button>
        </div>
        {conversionResult && conversionResult.type === 'adToBs' && (
          <div style={{ marginTop: '15px', padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
            <p style={{ fontWeight: '600', marginBottom: '10px' }}>Result:</p>
            <p><strong>BS Date:</strong> {conversionResult.output}</p>
            <p><strong>Nepali Format:</strong> {conversionResult.formatted}</p>
            <p style={{ fontSize: '20px', marginTop: '5px' }}><strong>Nepali Numeral:</strong> {conversionResult.nepali}</p>
          </div>
        )}
      </div>

      {/* BS to AD Converter */}
      <div className="result-box">
        <h3 style={{ marginTop: 0 }}>🔄 Convert BS to AD</h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Year"
            value={bsYear}
            onChange={(e) => setBsYear(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              width: '100px'
            }}
          />
          <input
            type="number"
            placeholder="Month"
            value={bsMonth}
            onChange={(e) => setBsMonth(e.target.value)}
            min="1"
            max="12"
            style={{
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              width: '100px'
            }}
          />
          <input
            type="number"
            placeholder="Day"
            value={bsDay}
            onChange={(e) => setBsDay(e.target.value)}
            min="1"
            max="32"
            style={{
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              width: '100px'
            }}
          />
          <button 
            onClick={convertBStoAD}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Convert to AD
          </button>
        </div>
        {conversionResult && conversionResult.type === 'bsToAd' && (
          <div style={{ marginTop: '15px', padding: '15px', background: '#f9fafb', borderRadius: '8px' }}>
            <p style={{ fontWeight: '600', marginBottom: '10px' }}>Result:</p>
            <p><strong>AD Date:</strong> {conversionResult.output}</p>
            <p><strong>Formatted:</strong> {conversionResult.formatted}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Date Picker Component
const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState<any>(null);

  return (
    <div>
      <p style={{ marginBottom: '15px', color: '#64748b' }}>
        Click on the date picker below to select a date. The converted dates will appear automatically.
      </p>
      <NepaliDatePicker
        onChange={(result) => {
          console.log('Date selected:', result);
          setSelectedDate(result);
        }}
        theme={{
          primary: '#2563eb',
          radius: '12px'
        }}
      />
      {selectedDate && (
        <div className="result-box" style={{ marginTop: '20px', background: '#f0fdf4', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ marginTop: 0, color: '#10b981' }}>✅ Selected Date Result:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
            <div>
              <p style={{ fontWeight: '600', marginBottom: '5px' }}>Nepali (BS):</p>
              <p style={{ fontSize: '18px' }}>{selectedDate.bs}</p>
              <p style={{ fontSize: '24px', marginTop: '5px', color: '#059669' }}>{selectedDate.nepali}</p>
            </div>
            <div>
              <p style={{ fontWeight: '600', marginBottom: '5px' }}>English (AD):</p>
              <p style={{ fontSize: '18px' }}>{selectedDate.ad.toISOString().split('T')[0]}</p>
              <p style={{ fontSize: '16px', marginTop: '5px', color: '#64748b' }}>
                {selectedDate.ad.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div>
      {/* Search for Language Switcher Section */}
      <div className="test-section" style={{ background: '#f0fdf4', borderLeftColor: '#10b981' }}>
        <LanguageSwitcherDemo />
      </div>

      {/* Date Picker Section */}
      <div className="test-section">
        <h2>📅 Interactive Date Picker</h2>
        <DatePickerExample />
      </div>

      {/* Converter Section */}
      <div className="test-section">
        <h2>🔄 Date Converter</h2>
        <p style={{ color: '#64748b', marginBottom: '15px' }}>
          Convert between English (AD) and Nepali (BS) dates manually using the inputs below.
        </p>
        <ConverterExample />
      </div>
    </div>
  );
};

// Render the app
const rootElement = document.getElementById('react-root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
