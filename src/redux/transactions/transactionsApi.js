import axios from 'axios';

axios.defaults.baseURL = 'https://wallet.b.goit.study/api';

export const addTransactionAPI = async transaction => {
  const { data } = await axios.post('/transactions', transaction);
  return data;
};

export const updateTransactionAPI = async (id, transaction) => {
  const { data } = await axios.patch(`/transactions/${id}`, transaction);
  return data;
};

export const deleteTransactionAPI = async id => {
  const { data } = await axios.delete(`/transactions/${id}`);
  return data;
};

export const getTransactionsAPI = async () => {
  const { data } = await axios.get('/transactions');
  return data;
};
