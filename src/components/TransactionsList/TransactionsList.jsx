import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectTransactions,
  selectIsLoading,
  selectError,
} from '../../redux/transactions/transactionsSelectors';
import { TransactionsItem } from '../TransactionsItem/TransactionsItem';

export const TransactionsList = () => {
  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading) {
    return <h3 style={{ color: 'white', textAlign: 'center' }}>Loading...</h3>;
  }

  return (
    <div
      style={{
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* Eğer backend'e ulaşılamazsa veya hata dönerse ekranda göster */}
      {error && (
        <div
          style={{
            backgroundColor: 'rgba(255, 101, 150, 0.1)',
            border: '1px solid #ff6596',
            padding: '10px',
            borderRadius: '8px',
            color: '#ff6596',
            textAlign: 'center',
            marginBottom: '15px',
          }}
        >
          Server Error: {error}
        </div>
      )}

      {/* İşlem yoksa uyarı mesajı (Sadece hata yoksa ve liste boşsa göster) */}
      {!error && (!transactions || transactions.length === 0) && (
        <p
          style={{
            textAlign: 'center',
            color: 'gray',
            marginTop: '40px',
            fontSize: '18px',
          }}
        >
          No transactions found. Click the + button to add one!
        </p>
      )}

      {/* İşlemler varsa listele */}
      {transactions &&
        transactions.map(transaction => (
          <TransactionsItem
            key={transaction.id || transaction._id}
            transaction={transaction}
          />
        ))}
    </div>
  );
};
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
