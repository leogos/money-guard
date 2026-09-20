import axiosInstance from './axiosInstance';

export const registerUser = async userData => {
  const { data } = await axiosInstance.post('/api/auth/sign-up', userData);

  return data;
};

export const loginUser = async credentials => {
  const { data } = await axiosInstance.post('/api/auth/sign-in', credentials);

  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get('/api/users/current');

  return data;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.delete('/api/auth/sign-out');

  return data;
};
