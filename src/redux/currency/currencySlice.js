import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrency } from './currencyOperations';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCurrency.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCurrency.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCurrency.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default currencySlice.reducer;