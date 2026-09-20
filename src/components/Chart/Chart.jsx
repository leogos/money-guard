import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { selectStatistics } from '../../redux/statistics/statisticsSelectors';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {
    const statistics = useSelector(selectStatistics);

    const categories = statistics?.categoriesSummary ?? [];

    const data = {
        labels: categories.map(category => category.name),
        datasets: [
            {
                label: 'Expenses',
                data: categories.map(category => category.total),
            },
        ],
    };

    return <Bar data={data} />;
};

export default Chart;