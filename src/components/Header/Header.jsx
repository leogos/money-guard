import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authOperations';
import { selectUser } from '../../features/auth/authSelectors';
import css from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const handleLogout = async () => {
    const resultAction = await dispatch(logout());

    if (logout.fulfilled.match(resultAction)) {
      navigate('/login');
    }
  };
  
  return (
    <header className={css.header}>
      <div className={css.logo}>Money Guard</div>

      <div className={css.userInfo}>
        <span className={css.username}>{user?.username || 'User'}</span>

        <button
          className={css.logoutButton}
          type="button"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
