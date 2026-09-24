import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../../redux/transactions/transactionsOperations';

export const ButtonDeleteTransaction = ({ transactionId }) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTransaction(transactionId));
    setShowConfirm(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowConfirm(true)}
        style={{
          background: 'none',
          color: '#ff6596',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Delete
      </button>

      {/* Onay Kutusu */}
      {showConfirm && (
        <div
          style={{
            position: 'absolute',
            bottom: '120%',
            right: 0,
            background: 'white',
            color: 'black',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 10,
            width: '180px',
          }}
        >
          <p
            style={{
              margin: '0 0 15px 0',
              fontSize: '14px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Are you sure?
          </p>
          <div
            style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
          >
            <button
              onClick={handleDelete}
              style={{
                background: '#24cca7',
                color: 'white',
                border: 'none',
                padding: '5px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              style={{
                background: '#ff6596',
                color: 'white',
                border: 'none',
                padding: '5px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
