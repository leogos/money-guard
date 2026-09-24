import styles from './StatisticsDashboard.module.css';
import { useEffect, useState } from 'react';
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
            <h1 className={styles.title}>
                Statistics
            </h1>

            <div className={styles.filters}>
                <select
                    className={styles.select}
                    value={month}
                    onChange={event =>
                        setMonth(Number(event.target.value))
                    }
                >
                    {months.map(item => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    ))}
                </select>

                <select
                    className={styles.select}
                    value={year}
                    onChange={event =>
                        setYear(Number(event.target.value))
                    }
                >
                    {years.map(item => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default StatisticsDashboard;