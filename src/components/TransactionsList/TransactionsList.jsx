import TransactionsItem from '../TransactionsItem/TransactionsItem';
import css from './TransactionsList.module.css';

const TransactionsList = ({
  transactions = [],
  onEdit,
  onDelete,
}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <section className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>Transactions</h2>
          <p className={css.count}>0 transactions</p>
        </div>

        <p className={css.empty}>No transactions yet.</p>
      </section>
    );
  }

  return (
    <section className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>Transactions</h2>

        <p className={css.count}>
          {transactions.length}{' '}
          {transactions.length === 1 ? 'transaction' : 'transactions'}
        </p>
      </div>

      <div className={css.list}>
        {transactions.map(transaction => (
          <TransactionsItem
            key={transaction._id || transaction.id}
            transaction={transaction}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default TransactionsList;
