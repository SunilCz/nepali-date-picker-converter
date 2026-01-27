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

// Date Picker Example
const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [restrictedDate, setRestrictedDate] = useState<any>(null);

  // Today's date for max restriction example
  const today = new Date();
  const todayBS = adToBs(today);
  const todayStr = `${todayBS.year}-${String(todayBS.month).padStart(2, '0')}-${String(todayBS.day).padStart(2, '0')}`;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Basic Example */}
        <div className="example-card">
          <h3 style={{ marginBottom: '10px' }}>1. Basic & Complex Usage</h3>
          <p style={{ marginBottom: '15px', color: '#64748b', fontSize: '14px' }}>
            Supports <code>inputClassName</code> and complex <code>onChange</code> objects.
          </p>
          <NepaliDatePicker
            inputClassName="test-input-custom"
            placeholder="Select a date..."
            onChange={(val, result) => {
              console.log('Class-based value:', val);
              console.log('Result result:', result);
              // Demonstrating .format() on the first argument
              setSelectedDate(val);
            }}
          />
          {selectedDate && (
            <div style={{ marginTop: '15px', padding: '10px', background: '#f8fafc', borderRadius: '8px', fontSize: '13px' }}>
              <p><b>Formatted via .format():</b> {selectedDate.format("YYYY-MM-DD")}</p>
              <p><b>Nepali via .format():</b> {selectedDate.format("YYYY-MM-DD", "long", "long")}</p>
              <p><b>Direct .bs property:</b> {selectedDate.bs}</p>
            </div>
          )}
        </div>

        {/* Min/Max Example */}
        <div className="example-card">
          <h3 style={{ marginBottom: '10px' }}>2. Min/Max Constraints</h3>
          <p style={{ marginBottom: '15px', color: '#64748b', fontSize: '14px' }}>
            Restricted to dates between <b>2080-01-01</b> and <b>Today ({todayStr})</b>.
          </p>
          <NepaliDatePicker
            min="2080-01-01"
            max={todayStr}
            onChange={(val) => setRestrictedDate(val)}
          />
          {restrictedDate && (
            <div style={{ marginTop: '15px', padding: '10px', background: '#fff7ed', borderRadius: '8px', fontSize: '13px' }}>
              <p><b>Selected:</b> {restrictedDate.bs}</p>
              <p style={{ color: '#9a3412' }}>Check the calendar to see disabled dates!</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .example-card {
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: white;
        }
        .test-input-custom {
          border-color: #10b981 !important;
          background-color: #f0fdf4 !important;
        }
      `}</style>
    </div>
  );
};

// Sync Demo Component
const SyncDemoExample = () => {
    const [bsValue, setBsValue] = useState("2082-01-01");
    const [lastResult, setLastResult] = useState<any>(null);

    const handleEnglishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const adDate = new Date(e.target.value);
        if (!isNaN(adDate.getTime())) {
            const bs = adToBs(adDate); 
            const bsStr = `${bs.year}-${String(bs.month).padStart(2, '0')}-${String(bs.day).padStart(2, '0')}`;
            setBsValue(bsStr);
        }
    };

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginBottom: '20px', padding: '15px', background: '#fff7ed', borderRadius: '10px', border: '1px solid #ffedd5' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>1. Standard English Input (AD)</label>
                <input 
                    type="date" 
                    onChange={handleEnglishChange} 
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ddd', width: '200px' }}
                />
                <p style={{ fontSize: '12px', color: '#9a3412', marginTop: '5px' }}>Selecting a date here will automatically update the Nepali Picker below.</p>
            </div>

            <div style={{ padding: '15px', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #e0f2fe' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>2. Nepali Date Picker (Synced)</label>
                <NepaliDatePicker 
                    value={bsValue} 
                    onChange={(res) => {
                        if (res) {
                            setBsValue(res.bs);
                            setLastResult(res);
                        }
                    }} 
                />
            </div>

            {lastResult && (
                <div style={{ marginTop: '15px', fontSize: '14px' }}>
                    <b>Synced Result:</b> {lastResult.bs} ({lastResult.nepali})
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

      {/* Sync Demo Section */}
      <div className="test-section" style={{ background: '#f8fafc', borderLeftColor: '#2563eb' }}>
        <h2>🔗 AD ↔ BS Synchronization</h2>
        <p style={{ color: '#64748b', marginBottom: '15px' }}>
            This demo shows how you can link a standard HTML date input to the NepaliDatePicker.
        </p>
        <SyncDemoExample />
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
