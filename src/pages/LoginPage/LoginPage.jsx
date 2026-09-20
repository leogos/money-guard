import LoginForm from '../../components/LoginForm/LoginForm';

import logo from '../../assets/mglogo.png';
import logo2x from '../../assets/mglogo@2x.png';
import leftCoins from '../../assets/loginleftcoins.jpg';
import leftCoins2x from '../../assets/loginleftcoins@2x.jpg';
import rightCoins from '../../assets/loginrightcoins.jpg';
import rightCoins2x from '../../assets/loginrightcoins@2x.jpg';

import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <main className={styles.page}>
      <img
        className={styles.leftCoins}
        src={leftCoins}
        srcSet={`${leftCoins} 1x, ${leftCoins2x} 2x`}
        alt=""
        aria-hidden="true"
      />
      <img
        className={styles.rightCoins}
        src={rightCoins}
        srcSet={`${rightCoins} 1x, ${rightCoins2x} 2x`}
        alt=""
        aria-hidden="true"
      />
      <section className={styles.card}>
        <div className={styles.brand}>
          <img
            className={styles.logo}
            src={logo}
            srcSet={`${logo} 1x, ${logo2x} 2x`}
            alt="Money Guard"
          />
          <h1 className={styles.title}>Money Guard</h1>
        </div>
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
