import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  addTransactionAPI,
  updateTransactionAPI,
  deleteTransactionAPI,
  getTransactionsAPI,
} from './transactionsApi';

const setAuthHeader = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

// Token'ı güvenli bir şekilde arayan yardımcı fonksiyon
const getTokenSafely = state => {
  // Projendeki reducer ismine göre auth, session veya user içinde arar.
  // Çökmeyi engellemek için soru işareti (?.) (Optional Chaining) kullanıyoruz.
  return state.auth?.token || state.session?.token || state.user?.token;
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = getTokenSafely(state);

      if (!token) return thunkAPI.rejectWithValue('Token bulunamadı.');

      setAuthHeader(token);
      const data = await getTransactionsAPI();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      setAuthHeader(getTokenSafely(state));
      const data = await addTransactionAPI(transactionData);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async ({ id, ...transactionData }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      setAuthHeader(getTokenSafely(state));
      const data = await updateTransactionAPI(id, transactionData);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      setAuthHeader(getTokenSafely(state));
      await deleteTransactionAPI(transactionId);
      return transactionId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
import { getTransactions as getTransactionsApi } from '../../services/transactionsApi';

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTransactionsApi();

      return response?.data?.data ?? response?.data ?? response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch transactions'
      );
    }
  }
);

