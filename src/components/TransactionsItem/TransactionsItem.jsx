import React, { useState } from 'react';
import { ButtonDeleteTransaction } from '../ButtonDeleteTransaction/ButtonDeleteTransaction';
import { ModalEditTransaction } from '../ModalEditTransaction/ModalEditTransaction';
import styles from './TransactionsItem.module.css';

export const TransactionsItem = ({ transaction }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isIncome = transaction.type === 'income';
  const color = isIncome ? '#24cca7' : '#ff6596';

  return (
    <>
      <div className={styles.itemCard} style={{ borderLeftColor: color }}>
        <div className={styles.infoGroup}>
          <span className={styles.date}>
            {new Date(transaction.date).toLocaleDateString()}
          </span>
          <span className={styles.category}>
            {transaction.category || 'Income'}
          </span>
          <span className={styles.comment}>{transaction.comment}</span>
        </div>

        <div className={styles.actionGroup}>
          <span className={styles.sum} style={{ color: color }}>
            {isIncome ? '+' : '-'}
            {transaction.sum}
          </span>

          <button
            className={styles.editBtn}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </button>

          <ButtonDeleteTransaction
            transactionId={transaction.id || transaction._id}
          />
        </div>
      </div>

      <ModalEditTransaction
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        transaction={transaction}
      />
    </>
  );
};
import css from './TransactionsItem.module.css';

const TransactionsItem = ({ transaction, onEdit, onDelete }) => {
  if (!transaction) {
    return null;
  }

  const {
    _id,
    id,
    type,
    category,
    date,
    comment,
    amount,
  } = transaction;

  const transactionId = _id || id;

  const formattedAmount = Number(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <article className={css.item}>
      <div className={css.info}>
        <div className={css.row}>
          <span className={css.label}>Type</span>
          <span
            className={
              type === 'income' ? css.income : css.expense
            }
          >
            {type || '-'}
          </span>
        </div>

        <div className={css.row}>
          <span className={css.label}>Category</span>
          <span className={css.value}>{category || '-'}</span>
        </div>

        <div className={css.row}>
          <span className={css.label}>Date</span>
          <span className={css.value}>{date || '-'}</span>
        </div>

        <div className={css.row}>
          <span className={css.label}>Comment</span>
          <span className={css.value}>{comment || '-'}</span>
        </div>

        <div className={css.row}>
          <span className={css.label}>Amount</span>
          <span
            className={
              type === 'income' ? css.incomeAmount : css.expenseAmount
            }
          >
            ₺ {formattedAmount}
          </span>
        </div>
      </div>

      <div className={css.actions}>
        <button
          className={css.editButton}
          type="button"
          onClick={() => onEdit?.(transaction)}
        >
          Edit
        </button>

        <button
          className={css.deleteButton}
          type="button"
          onClick={() => onDelete?.(transactionId)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default TransactionsItem;
