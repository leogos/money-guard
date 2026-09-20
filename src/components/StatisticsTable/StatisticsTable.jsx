import { useSelector } from 'react-redux';
import { selectStatistics } from '../../redux/statistics/statisticsSelectors';

const StatisticsTable = () => {
    const statistics = useSelector(selectStatistics);

    return (
        
        <div>
            <p>Income: {statistics?.incomeSummary ?? 0}</p>
            <p>Expenses: {statistics?.expenseSummary ?? 0}</p>
            <p>Total: {statistics?.periodTotal ?? 0}</p>
            {statistics?.categoriesSummary?.map(category => (
                <div key={category.name}>
                    <span>{category.name}</span>
                    <span>{category.total}</span>
                </div>
            ))}
        </div>
    );
};

export default StatisticsTable;