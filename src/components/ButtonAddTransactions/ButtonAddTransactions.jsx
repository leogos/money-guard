import React from 'react';
import styles from './ButtonAddTransactions.module.css';

export const ButtonAddTransactions = ({ onClick }) => {
  return (
    <button
      className={styles.addBtn}
      onClick={onClick}
      type="button"
      aria-label="Add transaction"
    >
      {/* İndirmeye gerek kalmadan, %100 düz ve ortalanmış SVG artı ikonu */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2V18M2 10H18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
