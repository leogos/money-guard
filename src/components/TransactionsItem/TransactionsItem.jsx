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
