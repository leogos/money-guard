import styles from './Chart.module.css';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { selectStatistics } from '../../redux/statistics/statisticsSelectors';

ChartJS.register(ArcElement, Tooltip, Legend);

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

const Chart = () => {
    const statistics = useSelector(selectStatistics);

    const categories = statistics?.categoriesSummary ?? [];

    const expenseCategories = categories.filter(
        category => category.type === 'EXPENSE'
    );

    const totalExpenses = expenseCategories.reduce(
        (sum, category) => sum + Number(category.total || 0),
        0
    );

    const hasTransactions = expenseCategories.some(
        category => Number(category.total || 0) > 0
    );

    const data = {
        labels: hasTransactions
            ? expenseCategories.map(category => category.name)
            : ['Expenses'],

        datasets: [
            {
                data: hasTransactions
                    ? expenseCategories.map(category =>
                        Number(category.total || 0)
                    )
                    : [1],

                backgroundColor: hasTransactions
                    ? expenseCategories.map(
                        (_, index) =>
                            CATEGORY_COLORS[
                            index % CATEGORY_COLORS.length
                            ]
                    )
                    : ['rgba(255, 255, 255, 0.08)'],

                borderWidth: 0,

                hoverOffset: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        cutout: '68%',

        animation: {
            duration: 0,
        },

        plugins: {
            legend: {
                display: false,
            },

            tooltip: {
                enabled: hasTransactions,
            },
        },
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.chart}>
                <Doughnut
                    data={data}
                    options={options}
                />

                <div className={styles.total}>
                    <span>
                        $ {totalExpenses.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Chart;
