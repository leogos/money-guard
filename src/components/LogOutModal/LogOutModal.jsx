import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/auth/operations';
import { clearFinance } from '../../redux/finance/slice';
import { clearTransactions } from '../../redux/transactions/slice';
import styles from './LogOutModal.module.css';

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('logout-modal-open');

    return () => {
      document.body.classList.remove('logout-modal-open');
    };
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(clearFinance());
      dispatch(clearTransactions());
      localStorage.clear();
      navigate('/login', { replace: true });
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={event => event.stopPropagation()}>
        <div className={styles.logoWrap}>
          <img className={styles.logoIcon} src="/favicon.svg" alt="" />
          <span className={styles.logoText}>Money Guard</span>
        </div>
        <p className={styles.text}>Are you sure you want to log out?</p>
        <div className={styles.btnGroup}>
          <button
            className={styles.logoutBtn}
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button className={styles.cancelBtn} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
