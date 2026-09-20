import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
import Chart from '../../components/Chart/Chart';

const StatisticsTab = () => {
    return (
        <div>
            <StatisticsDashboard />
            <Chart />
            <StatisticsTable />
        </div>
    );
};

export default StatisticsTab;