import Balance from '../../components/Balance/Balance';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import css from './HomeTab.module.css';

const HomeTab = () => {
  return (
    <section className={css.container}>
      <Balance />

      <TransactionsList />
    </section>
  );
};

export default HomeTab;
