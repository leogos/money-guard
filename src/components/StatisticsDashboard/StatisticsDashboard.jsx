import styles from './StatisticsDashboard.module.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStatistics } from '../../redux/statistics/statisticsOperations';

const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
];

const years = [
    2026,
    2025,
    2024,
    2023,
    2022,
    2021,
    2020,
];

const Dropdown = ({ value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = event => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, []);

    const selectedOption = options.find(
        option =>
            typeof option === 'object'
                ? option.value === value
                : option === value
    );

    const selectedLabel =
        typeof selectedOption === 'object'
            ? selectedOption.label
            : selectedOption;

    return (
        <div
            ref={dropdownRef}
            className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ''
                }`}
        >
            <button
                type="button"
                className={styles.dropdownButton}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <span>{selectedLabel}</span>

                <span className={styles.arrow} />
            </button>

            {isOpen && (
                <ul className={styles.dropdownList}>
                    {options.map(option => {
                        const optionValue =
                            typeof option === 'object'
                                ? option.value
                                : option;

                        const optionLabel =
                            typeof option === 'object'
                                ? option.label
                                : option;

                        return (
                            <li key={optionValue}>
                                <button
                                    type="button"
                                    className={styles.option}
                                    onClick={() => {
                                        onChange(optionValue);
                                        setIsOpen(false);
                                    }}
                                >
                                    {optionLabel}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

const StatisticsDashboard = () => {
    const dispatch = useDispatch();

    const [month, setMonth] = useState(3);
    const [year, setYear] = useState(2023);

    useEffect(() => {
        dispatch(
            fetchStatistics({
                month,
                year,
            })
        );
    }, [dispatch, month, year]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Statistics</h1>

            <div className={styles.filters}>
                <Dropdown
                    value={month}
                    options={months}
                    onChange={setMonth}
                />

                <Dropdown
                    value={year}
                    options={years}
                    onChange={setYear}
                />
            </div>
        </div>
    );
};

export default StatisticsDashboard;