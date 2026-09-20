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

const years = [2024, 2025, 2026];

const StatisticsDashboard = () => {
    const dispatch = useDispatch();

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        dispatch(fetchStatistics({ month, year }));
    }, [dispatch, month, year]);

    return (
        <div>
            <label>
                Month
                <select
                    value={month}
                    onChange={event => setMonth(Number(event.target.value))}
                >
                    {months.map(item => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Year
                <select
                    value={year}
                    onChange={event => setYear(Number(event.target.value))}
                >
                    {years.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default StatisticsDashboard;