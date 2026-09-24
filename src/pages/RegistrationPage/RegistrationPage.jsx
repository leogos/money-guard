import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import logo from '../../assets/mglogo@2x.png';
import leftDollars from '../../assets/registrationleftdollars@2x.jpg';
import rightDollars from '../../assets/registrationrightdollars@2x.jpg';
import tabletDollar from '../../assets/registrationtabletdollar.jpg';
import tabletDollar2x from '../../assets/registrationdollarstablet@2x.jpg';

import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <main className={styles.page}>
      <img
        className={styles.leftDollars}
        src={leftDollars}
        alt=""
        aria-hidden="true"
      />
      <img
        className={styles.rightDollars}
        src={rightDollars}
        alt=""
        aria-hidden="true"
      />
      <img
        className={styles.tabletDollar}
        src={tabletDollar}
        srcSet={`${tabletDollar} 1x, ${tabletDollar2x} 2x`}
        alt=""
        aria-hidden="true"
      />
      <section className={styles.card}>
        <div className={styles.brand}>
          <img className={styles.logo} src={logo} alt="Money Guard" />
          <h1 className={styles.title}>Money Guard</h1>
        </div>
        <RegistrationForm />
      </section>
    </main>
  );
};

export default RegistrationPage;
