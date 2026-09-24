import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrency } from '../../services/currencyApi';

export const fetchCurrency = createAsyncThunk(
    'currency/fetchCurrency',
    async (_, thunkAPI) => {
        try {
            return await getCurrency();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);