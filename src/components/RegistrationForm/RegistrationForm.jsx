import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

import { register } from '../../redux/auth/authOperations';
import { selectIsLoading } from '../../redux/auth/authSelectors';
import ProgressBar from '../ProgressBar/ProgressBar';

import styles from './RegistrationForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must contain at least 6 characters')
    .max(12, 'Password must contain no more than 12 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const UserIcon = () => (
  <svg
    className={styles.icon}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="3" fill="currentColor" />
    <path
      d="M5 19C5 15.6863 8.13401 13 12 13C15.866 13 19 15.6863 19 19"
      fill="currentColor"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    className={styles.icon}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3 6.75C3 5.784 3.784 5 4.75 5H19.25C20.216 5 21 5.784 21 6.75V17.25C21 18.216 20.216 19 19.25 19H4.75C3.784 19 3 18.216 3 17.25V6.75Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M4 7L12 13L20 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PasswordIcon = () => (
  <svg
    className={styles.icon}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="5"
      y="10"
      width="14"
      height="10"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 10V7.5C8 5.567 9.567 4 11.5 4H12.5C14.433 4 16 5.567 16 7.5V10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
  </svg>
);

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const name = watch('name', '');
  const email = watch('email', '');
  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const onSubmit = async ({ name, email, password }) => {
    try {
      await dispatch(
        register({
          username: name,
          email,
          password,
        })
      ).unwrap();

      navigate('/dashboard');
    } catch (error) {
      toast.error(error || 'Registration failed');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="register-name">
          Name
        </label>
        <div className={styles.inputWrapper}>
          <UserIcon />
          <input
            className={styles.input}
            id="register-name"
            type="text"
            placeholder="Name"
            autoComplete="name"
            {...registerField('name')}
          />
        </div>
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="register-email">
          Email
        </label>
        <div className={styles.inputWrapper}>
          <EmailIcon />
          <input
            className={styles.input}
            id="register-email"
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            {...registerField('email')}
          />
        </div>
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="register-password">
          Password
        </label>
        <div className={styles.inputWrapper}>
          <PasswordIcon />
          <input
            className={styles.input}
            id="register-password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            {...registerField('password')}
          />
        </div>
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="register-confirm-password">
          Confirm password
        </label>
        <div className={styles.inputWrapper}>
          <PasswordIcon />
          <input
            className={styles.input}
            id="register-confirm-password"
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            {...registerField('confirmPassword')}
          />
        </div>
        <ProgressBar
          name={name}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}
      </div>
      <button
        className={styles.submitButton}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Registering...' : 'REGISTER'}
      </button>
      <Link className={styles.loginButton} to="/login">
        LOG IN
      </Link>
    </form>
  );
};

export default RegistrationForm;
