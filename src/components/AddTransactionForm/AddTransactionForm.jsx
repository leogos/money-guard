import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/transactions/transactionsOperations';
import styles from './AddTransactionForm.module.css';

const schema = yup.object().shape({
  type: yup.string().required(),
  sum: yup
    .number()
    .typeError('Lütfen geçerli bir tutar girin')
    .positive('Tutar sıfırdan büyük olmalıdır')
    .required('Tutar zorunludur'),
  date: yup.date().required('Tarih zorunludur'),
  comment: yup.string(),
  category: yup.string().when('type', {
    is: 'expense',
    then: () => yup.string().required('Gider için kategori seçmelisiniz'),
    otherwise: () => yup.string().notRequired(),
  }),
});

export const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'expense',
      date: new Date(),
      sum: '',
      comment: '',
      category: '',
    },
  });

  const transactionType = watch('type');
  const selectedCategory = watch('category');

  const categories = [
    'Main expenses',
    'Products',
    'Car',
    'Self care',
    'Child care',
    'Household products',
    'Education',
    'Leisure',
  ];

  const handleCategorySelect = category => {
    setValue('category', category, { shouldValidate: true });
    setIsCategoryOpen(false);
  };

  const onSubmit = data => {
    const formattedData = {
      ...data,
      date: data.date.toISOString(),
    };

    dispatch(addTransaction(formattedData))
      .unwrap()
      .then(() => {
        if (onClose) onClose();
      })
      .catch(err => console.error('Ekleme Hatası:', err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.toggleContainer}>
        <span
          className={transactionType === 'income' ? styles.activeIncome : ''}
        >
          Income
        </span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            {...register('type')}
            value={transactionType === 'expense' ? 'income' : 'expense'}
          />
          <span className={styles.slider}></span>
        </label>
        <span
          className={transactionType === 'expense' ? styles.activeExpense : ''}
        >
          Expense
        </span>
      </div>

      {transactionType === 'expense' && (
        <div className={styles.inputGroup}>
          <div className={styles.customSelectContainer}>
            <div
              className={`${styles.input} ${styles.customSelect}`}
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <span
                style={{
                  color: selectedCategory
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.6)',
                }}
              >
                {selectedCategory || 'Select a category'}
              </span>
              <svg
                className={styles.arrow}
                width="18"
                height="9"
                viewBox="0 0 18 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  marginRight: '10px',
                }}
              >
                <path
                  d="M1 1L9 8L17 1"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {isCategoryOpen && (
              <ul className={styles.dropdownList}>
                {categories.map(cat => (
                  <li
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={styles.dropdownItem}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.category && (
            <span className={styles.error}>{errors.category.message}</span>
          )}
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('sum')}
            className={styles.input}
          />
          {errors.sum && (
            <span className={styles.error}>{errors.sum.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.dateInputWrapper}>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={date => field.onChange(date)}
                  dateFormat="dd.MM.yyyy"
                  className={styles.input}
                />
              )}
            />
            {/* Figma'daki Orijinal İçi Dolu Takvim İkonu Buraya Gömüldü */}
            <svg
              className={styles.calendarIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#734AEF"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z" />
            </svg>
          </div>
          {errors.date && (
            <span className={styles.error}>{errors.date.message}</span>
          )}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Comment"
          {...register('comment')}
          className={styles.input}
        />
      </div>

      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.submitBtn}>
          ADD
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onClose}>
          CANCEL
        </button>
      </div>
    </form>
  );
};
