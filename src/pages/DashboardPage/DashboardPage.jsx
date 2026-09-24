import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import HomeTab from '../HomeTab/HomeTab';
import css from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div className={css.page}>
      <Header />

      <div className={css.layout}>
        <aside className={css.sidebar}>
          <Navigation />
        </aside>

        <main className={css.main}>
          <div className={css.content}>
            <h1 className={css.title}>Dashboard</h1>

            <HomeTab />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;