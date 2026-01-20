import React, { useState } from 'react';
import { NepaliDatePicker } from 'nepali-date-picker-converter';

const LanguageSwitcherDemo = () => {
    const [selectedData, setSelectedData] = useState<any>(null);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
            <h2 style={{ color: '#2563eb', marginBottom: '10px' }}>🇳🇵 Language Switcher Demo</h2>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
                This demo demonstrates the new <b>Language Switcher</b> feature. 
                Open the picker and look for the <b>"ने / EN"</b> toggle in the header.
            </p>

            <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>
                    1. Global Nepali Language (Prop only)
                </label>
                <div style={{ marginBottom: '10px', fontSize: '13px', color: '#64748b' }}>
                    This picker defaults to Nepali using <code>language="np"</code>. No toggle button is visible.
                </div>
                <NepaliDatePicker
                    language="np"
                    showLanguageSwitcher={true}
                    theme={{ primary: '#059669', radius: '12px' }}
                />
            </div>

            <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>
                    2. Interactive Switcher (Prop + Button)
                </label>
                <div style={{ marginBottom: '10px', fontSize: '13px', color: '#64748b' }}>
                    This picker enables the UI switcher via <code>showLanguageSwitcher={true}</code>.
                </div>
                <NepaliDatePicker
                    language='en'
                    onChange={(res) => setSelectedData(res)}
                    theme={{
                        primary: '#2563eb',
                        radius: '12px',
                        shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                />
            </div>

            {selectedData && (
                <div style={{ background: '#eff6ff', padding: '20px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                    <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#1e40af' }}>Selection Details:</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                            <span style={{ fontSize: '12px', color: '#60a5fa', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>BS Date</span>
                            <span style={{ fontSize: '18px', fontWeight: '700', color: '#1e3a8a' }}>{selectedData.bs}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '12px', color: '#60a5fa', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nepali Script</span>
                            <span style={{ fontSize: '20px', fontWeight: '700', color: '#1e3a8a' }}>{selectedData.nepali}</span>
                        </div>
                        <div style={{ gridColumn: 'span 2', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #dbeafe' }}>
                            <span style={{ fontSize: '12px', color: '#60a5fa', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AD equivalent</span>
                            <span style={{ fontSize: '14px', color: '#1e3a8a' }}>{selectedData.ad.toDateString()}</span>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '30px', padding: '15px', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fde68a', fontSize: '14px', color: '#92400e' }}>
                <b>💡 Tip:</b> You can also pass a default language via props: 
                <code style={{ background: '#fef3c7', padding: '2px 4px', borderRadius: '4px', marginLeft: '5px' }}>
                    &lt;NepaliDatePicker language="np" /&gt;
                </code>
            </div>
        </div>
    );
};

export default LanguageSwitcherDemo;
