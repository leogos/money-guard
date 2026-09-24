import React, { useEffect } from 'react';
import { EditTransactionForm } from '../EditTransactionForm/EditTransactionForm';
import styles from '../ModalAddTransaction/ModalAddTransaction.module.css'; // Aynı modal stilleri

export const ModalEditTransaction = ({ isOpen, onClose, transaction }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !transaction) return null;

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} type="button">
          ✕
        </button>
        <h2 className={styles.title}>Edit transaction</h2>

        <EditTransactionForm transaction={transaction} onClose={onClose} />

        <button
          className={styles.cancelButton}
          onClick={onClose}
          type="button"
          style={{ marginTop: '20px' }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};
