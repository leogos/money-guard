import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/authSelectors';
import css from './Balance.module.css';

const Balance = () => {
  const user = useSelector(selectUser);

  const balance = Number(user?.balance ?? 0);

  return (
    <section className={css.balance}>
      <p className={css.label}>Your balance</p>

      <p className={css.amount}>
        ₺{' '}
        {balance.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </section>
  );
};

export default Balance;

