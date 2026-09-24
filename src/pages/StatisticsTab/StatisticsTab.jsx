import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
import Chart from '../../components/Chart/Chart';
import styles from './StatisticsTab.module.css';
import { useSelector } from 'react-redux';

import {
    selectStatistics,
    selectStatisticsError,
    selectStatisticsLoading,
} from '../../redux/statistics/statisticsSelectors';

const StatisticsTab = () => {
    const statistics = useSelector(selectStatistics);
    const isLoading = useSelector(selectStatisticsLoading);
    const error = useSelector(selectStatisticsError);

    const categories = statistics?.categoriesSummary ?? [];

    const hasTransactions = categories.some(
        category => Number(category.total || 0) > 0
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.statisticsLayout}>
                <div className={styles.statisticsHeader}>
                    <StatisticsDashboard />
                </div>

                <div className={styles.content}>
                    <div className={styles.chartSection}>
                        <Chart />
                    </div>

                    <div className={styles.messageSection}>
                        {isLoading ? (
                            <p className={styles.emptyMessage}>
                                Loading statistics...
                            </p>
                        ) : error ? (
                            <p className={styles.emptyMessage}>
                                No transactions for this period.
                            </p>
                        ) : hasTransactions ? (
                            <StatisticsTable />
                        ) : (
                            <p className={styles.emptyMessage}>
                                No transactions for this period.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsTab;