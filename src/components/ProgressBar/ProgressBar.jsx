import styles from './ProgressBar.module.css';

const ProgressBar = ({ name, email, password, confirmPassword }) => {
  const fields = [name.trim(), email.trim(), password, confirmPassword];

  const completedFields = fields.filter(Boolean).length;
  const progress = completedFields * 25;

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div className={styles.progress} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
