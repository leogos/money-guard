
import styles from './StatisticsTable.module.css';
import { useSelector } from 'react-redux';

import { selectStatistics } from '../../redux/statistics/statisticsSelectors';

const CATEGORY_COLORS = [
    '#FED057',
    '#FFD8D0',
    '#FD9498',
    '#C5BAFF',
    '#6E78E8',
    '#4A56E2',
    '#81E176',
    '#24CE85',
    '#00AD8E',
];

const StatisticsTable = () => {
    const statistics = useSelector(selectStatistics);

    const categories = statistics?.categoriesSummary ?? [];

    const expenseCategories = categories.filter(
        category => category.type === 'EXPENSE'
    );

    const totalExpenses = expenseCategories.reduce(
        (sum, category) => sum + Number(category.total || 0),
        0
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <span>Category</span>
                <span>Sum</span>
            </div>

            <div className={styles.list}>
                {expenseCategories.map((category, index) => (
                    <div
                        className={styles.item}
                        key={category.name}
                    >
                        <div className={styles.category}>
                            <span
                                className={styles.dot}
                                style={{
                                    backgroundColor:
                                        CATEGORY_COLORS[
                                        index %
                                        CATEGORY_COLORS.length
                                        ],
                                }}
                            />

                            <span>{category.name}</span>
                        </div>

                        <span className={styles.amount}>
                            {Number(
                                category.total || 0
                            ).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            <div className={styles.summary}>
                <div className={styles.summaryRow}>
                    <span>Expenses</span>

                    <span>
                        {totalExpenses.toFixed(2)}
                    </span>
                </div>

                <div className={styles.summaryRow}>
                    <span>Income</span>

                    <span>
                        {Number(
                            statistics?.incomeSummary || 0
                        ).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatisticsTable;
