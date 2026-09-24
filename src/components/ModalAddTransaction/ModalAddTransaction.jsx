import React, { useEffect } from 'react';
import { AddTransactionForm } from '../AddTransactionForm/AddTransactionForm';

import styles from './ModalAddTransaction.module.css';

export const ModalAddTransaction = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* Sağ üstteki X kapatma butonu */}
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>

        <h2 className={styles.title}>Add transaction</h2>

        {/* Formu çağırıyoruz (Simetrik Cancel butonu artık bu formun içinde!) */}
        <AddTransactionForm onClose={onClose} />
      </div>
    </div>
  );
};
