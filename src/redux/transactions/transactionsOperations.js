import { createAsyncThunk } from '@reduxjs/toolkit';
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

