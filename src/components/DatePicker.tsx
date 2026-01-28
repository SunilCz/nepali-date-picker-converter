import React, { useState, useMemo, useEffect, useRef } from 'react';
import { bsToAd, adToBs } from '../core/converter';
import {
    NepaliDaysData,
    NepaliMonthsData,
    NP_INITIAL_YEAR,
    NP_MONTHS_DATA
} from '../core/metadata';
import { toNepaliNumeral, getSafeBSDateString } from '../utils/formatter';
import './styles.css';
import { DatePickerResult, LanguageCode, Theme, NepaliDatePickerProps } from '../core/types';


import { NepaliDate } from '../core/NepaliDate';

export const NepaliDatePicker = ({
    onChange,
    theme,
    value: valueProp,
    max,
    min,
    placeholder,
    inputClassName,
    dateLan = 'en',
    monthLan = 'en',
    dayLan = 'en',
    yearLan = 'en',
    language = 'en',
    showLanguageSwitcher = false,
}: NepaliDatePickerProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language);
    const [isMounted, setIsMounted] = useState(false);
    
    const [selectedDate, setSelectedDate] = useState<string>(getSafeBSDateString(valueProp) || "");
    const prevLanguageProp = useRef<LanguageCode>(language);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Parse max and min for comparison
    const maxDateStr = useMemo(() => max ? (typeof max === 'string' ? max : max.format("YYYY-MM-DD")) : null, [max]);
    const minDateStr = useMemo(() => min ? (typeof min === 'string' ? min : min.format("YYYY-MM-DD")) : null, [min]);

    useEffect(() => {
        if (prevLanguageProp.current !== language) {
            setCurrentLanguage(language);
            prevLanguageProp.current = language;
        }
    }, [language]);
    const [activeDropdown, setActiveDropdown] = useState<'m' | 'y' | null>(null);
    const pickerRef = useRef<HTMLDivElement>(null);
    const yearOptionsRef = useRef<HTMLDivElement>(null);
    const monthOptionsRef = useRef<HTMLDivElement>(null);

    const todayBS = useMemo(() => {
        try {
            return adToBs(new Date()) || { year: 2081, month: 1, day: 1 };
        } catch (e) {
            // Fallback to a safe middle-range date if system clock is out of range
            return { year: 2081, month: 1, day: 1 };
        }
    }, []);

    const [view, setView] = useState<{ y: number; m: number }>(() => {
        const val = getSafeBSDateString(valueProp);
        if (val && val.includes('-')) {
            const [y, m] = val.split('-').map(Number);
            if (!Number.isNaN(y) && !Number.isNaN(m) && m >= 1 && m <= 12 &&
                y >= NP_INITIAL_YEAR && y < NP_INITIAL_YEAR + NP_MONTHS_DATA.length) {
                return { y, m: m - 1 };
            }
        }
        return { y: todayBS.year, m: todayBS.month - 1 };
    });

    useEffect(() => {
        const val = getSafeBSDateString(valueProp);
        if (val && val !== selectedDate) {
            setSelectedDate(val);
            if (val.includes('-')) {
                const [y, m] = val.split('-').map(Number);
                if (!Number.isNaN(y) && !Number.isNaN(m) && m >= 1 && m <= 12 &&
                    y >= NP_INITIAL_YEAR && y < NP_INITIAL_YEAR + NP_MONTHS_DATA.length) {
                    setView({ y, m: m - 1 });
                }
            }
        } else if (valueProp === null || valueProp === "") {
            setSelectedDate("");
        }
    }, [valueProp]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // When year/month dropdown opens, set scroll position directly (no scroll animation)
    useEffect(() => {
        if (!isOpen || !activeDropdown) return;
        const applyScroll = (container: HTMLElement, selected: HTMLElement) => {
            const halfH = container.clientHeight / 2;
            const itemMid = selected.offsetTop + selected.offsetHeight / 2;
            container.scrollTop = Math.max(0, itemMid - halfH);
        };
        const frame = requestAnimationFrame(() => {
            if (activeDropdown === 'y' && yearOptionsRef.current) {
                const selected = yearOptionsRef.current.querySelector('.selected') as HTMLElement | null;
                if (selected) applyScroll(yearOptionsRef.current, selected);
            } else if (activeDropdown === 'm' && monthOptionsRef.current) {
                const selected = monthOptionsRef.current.querySelector('.selected') as HTMLElement | null;
                if (selected) applyScroll(monthOptionsRef.current, selected);
            }
        });
        return () => cancelAnimationFrame(frame);
    }, [isOpen, activeDropdown, view.y, view.m]);

    const dynamicStyle = {
        '--nck-primary': theme?.primary || '#2563eb',
        '--nck-primary-light': theme?.primaryLight || '#eff6ff',
        '--nck-radius': theme?.radius || '12px',
        '--nck-font': theme?.fontFamily || "'Inter', system-ui, sans-serif",
        '--nck-shadow': theme?.shadow || '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        '--nck-bg-input': theme?.inputBg || '#ffffff',
    } as React.CSSProperties;

    const monthsList = (monthLan === 'np' || (monthLan === 'en' && currentLanguage === 'np')) ? NepaliMonthsData.map(m => m.np) : NepaliMonthsData.map(m => m.en);
    const daysList = (dayLan === 'np' || (dayLan === 'en' && currentLanguage === 'np')) ? NepaliDaysData.map(d => d.np) : NepaliDaysData.map(d => d.en);
    const availableYears = useMemo(() => {
        let years = NP_MONTHS_DATA.map((_, i) => NP_INITIAL_YEAR + i);
        if (maxDateStr) {
            const maxY = parseInt(maxDateStr.split('-')[0], 10);
            if (!Number.isNaN(maxY)) years = years.filter(y => y <= maxY);
        }
        if (minDateStr) {
            const minY = parseInt(minDateStr.split('-')[0], 10);
            if (!Number.isNaN(minY)) years = years.filter(y => y >= minY);
        }
        return years;
    }, [maxDateStr, minDateStr]);

    const monthDays = useMemo(() => {
        const yearIndex = view.y - NP_INITIAL_YEAR;
        const yearData = (yearIndex >= 0 && yearIndex < NP_MONTHS_DATA.length) 
            ? NP_MONTHS_DATA[yearIndex] 
            : null;
        return yearData ? yearData[0][view.m] : 30;
    }, [view.y, view.m]);

    const startDayOfWeek = useMemo(() => {
        const yearIndex = view.y - NP_INITIAL_YEAR;
        if (yearIndex >= 0 && yearIndex < NP_MONTHS_DATA.length && view.m >= 0 && view.m < 12) {
            try {
                const ad = bsToAd(view.y, view.m + 1, 1);
                return ad ? ad.getDay() : 0;
            } catch (e) {
                return 0;
            }
        }
        return 0;
    }, [view.y, view.m]);

    const isDateDisabled = (year: number, month: number, day: number) => {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (maxDateStr && dateStr > maxDateStr) return true;
        if (minDateStr && dateStr < minDateStr) return true;
        return false;
    };

    const handleSelect = (day: number) => {
        if (isDateDisabled(view.y, view.m + 1, day)) return;
        const dateStr = `${view.y}-${String(view.m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        updateSelection(dateStr, view.y, view.m + 1, day);
        setActiveDropdown(null);
        setIsOpen(false);
    };

    const handleToday = () => {
        if (isDateDisabled(todayBS.year, todayBS.month, todayBS.day)) return;
        const dateStr = `${todayBS.year}-${String(todayBS.month).padStart(2, '0')}-${String(todayBS.day).padStart(2, '0')}`;
        setView({ y: todayBS.year, m: todayBS.month - 1 });
        updateSelection(dateStr, todayBS.year, todayBS.month, todayBS.day);
        setActiveDropdown(null);
        setIsOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedDate("");
        onChange?.(null, null);
        setActiveDropdown(null);
        setIsOpen(false);
    };

    const updateSelection = (dateStr: string, y: number, m: number, d: number) => {
        setSelectedDate(dateStr);
        const result: DatePickerResult = {
            bs: dateStr,
            ad: bsToAd(y, m, d),
            nepali: toNepaliNumeral(dateStr),
            bsDate: { year: y, month: m, day: d }
        };
        
        // Pass NepaliDate instance as first argument for "complex" support
        // But also ensure it can be treated as a string by some users if they use it in simplified contexts
        const nepaliDate = new NepaliDate(result.bsDate);
        onChange?.(nepaliDate, result);
    };

    if (!isMounted) return null;

    return (
        <div className="nck-wrapper" style={dynamicStyle} ref={pickerRef}>
            <div className={`nck-input-box ${inputClassName || ""}`} onClick={() => setIsOpen(!isOpen)}>
                <input
                    className={`nck-input ${inputClassName || ""}`}
                    readOnly
                    value={(dateLan === 'np' || (dateLan === 'en' && currentLanguage === 'np')) ? toNepaliNumeral(selectedDate) : selectedDate}
                    placeholder={placeholder || ((dateLan === 'np' || (dateLan === 'en' && currentLanguage === 'np')) ? "२०८२-०९-३०" : "YYYY-MM-DD")}
                />
                <div className="nck-input-actions">
                    <div className="nck-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="nck-popover">
                    <div className="nck-nav-row">
                        {/* Custom Month Dropdown */}
                        <div className="nck-custom-select">
                            <div className="nck-select-trigger" onClick={() => setActiveDropdown(activeDropdown === 'm' ? null : 'm')}>
                                {monthsList[view.m]}
                            </div>
                            {activeDropdown === 'm' && (
                                <div className="nck-select-options" ref={monthOptionsRef}>
                                    {monthsList.map((n, i) => (
                                        <div key={i} className={`nck-option ${view.m === i ? 'selected' : ''}`}
                                            onClick={() => { setView({ ...view, m: i }); setActiveDropdown(null); }}>
                                            {n}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Custom Year Dropdown */}
                        <div className="nck-custom-select">
                            <div className="nck-select-trigger" onClick={() => setActiveDropdown(activeDropdown === 'y' ? null : 'y')}>
                                {(yearLan === 'np' || (yearLan === 'en' && currentLanguage === 'np')) ? toNepaliNumeral(view.y) : view.y}
                            </div>
                            {activeDropdown === 'y' && (
                                <div className="nck-select-options" ref={yearOptionsRef}>
                                    {availableYears.map(y => (
                                        <div key={y} className={`nck-option ${view.y === y ? 'selected' : ''}`}
                                            onClick={() => { setView({ ...view, y: y }); setActiveDropdown(null); }}>
                                            {(yearLan === 'np' || (yearLan === 'en' && currentLanguage === 'np')) ? toNepaliNumeral(y) : y}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Language Switcher */}
                        {showLanguageSwitcher && (
                            <button 
                                type="button"
                                className="nck-lang-switcher" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentLanguage(currentLanguage === 'en' ? 'np' : 'en');
                                }}
                                title={currentLanguage === 'en' ? "नेपालीमा बदल्नुहोस्" : "Switch to English"}
                            >
                                {currentLanguage === 'en' ? 'ने' : 'EN'}
                            </button>
                        )}
                    </div>

                    <div className="nck-week-grid">
                        {daysList.map((d, i) => <div key={i} className="nck-week-day">{(dayLan === 'np' || (dayLan === 'en' && currentLanguage === 'np')) ? d.substring(0, 3) : d.substring(0, 2)}</div>)}
                    </div>

                    <div className="nck-date-grid">
                        {[...Array(startDayOfWeek)].map((_, i) => <div key={i} className="nck-cell empty"></div>)}
                        {[...Array(monthDays)].map((_, i) => {
                            const d = i + 1;
                            const isSelected = selectedDate === `${view.y}-${String(view.m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                            const isToday = todayBS.year === view.y && todayBS.month === (view.m + 1) && todayBS.day === d;
                            const disabled = isDateDisabled(view.y, view.m + 1, d);
                            return (
                                <div key={d} className={`nck-cell ${isSelected ? 'active' : ''} ${isToday ? 'today' : ''} ${disabled ? 'disabled' : ''}`} onClick={() => handleSelect(d)}>
                                    {(dateLan === 'np' || (dateLan === 'en' && currentLanguage === 'np')) ? toNepaliNumeral(d) : d}
                                </div>
                            );
                        })}
                    </div>

                    <div className="nck-footer">
                        <button type="button" 
                            className="nck-footer-btn nck-btn-today" 
                            disabled={isDateDisabled(todayBS.year, todayBS.month, todayBS.day)}
                            onClick={handleToday}
                        >
                            {(dateLan === 'np' || (dateLan === 'en' && currentLanguage === 'np')) ? 'आज' : 'Today'}
                        </button>
                        <button type="button" className="nck-footer-btn nck-btn-clear" onClick={handleClear}>
                            {(dateLan === 'np' || (dateLan === 'en' && currentLanguage === 'np')) ? 'रद्द' : 'Clear'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
