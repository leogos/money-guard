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
