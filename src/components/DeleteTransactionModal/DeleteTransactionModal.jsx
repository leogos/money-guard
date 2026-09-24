import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../../redux/transactions/transactionsOperations';
import styles from './DeleteTransactionModal.module.css';

export const DeleteTransactionModal = ({ transactionId, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTransaction(transactionId))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch(err => {
        console.error('Silme hatası:', err);
      });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Are you sure?</h2>
      <p className={styles.text}>
        Do you really want to delete this transaction? This action cannot be
        undone.
      </p>

      <div className={styles.buttonContainer}>
        {/* Projendeki Delete butonu tasarımı gradient ise deleteBtn kullanıyoruz */}
        <button
          type="button"
          onClick={handleDelete}
          className={styles.deleteBtn}
        >
          DELETE
        </button>
        <button type="button" onClick={onClose} className={styles.cancelBtn}>
          CANCEL
        </button>
      </div>
    </div>
  );
};
