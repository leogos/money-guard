import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.active}` : css.link
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/statistics"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.active}` : css.link
        }
      >
        Statistics
      </NavLink>

      <NavLink
        to="/currency"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.active}` : css.link
        }
      >
        Currency
      </NavLink>
    </nav>
  );
};
export default Navigation;
