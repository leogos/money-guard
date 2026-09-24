export const selectCurrency = state => state.currency.data;

export const selectCurrencyLoading = state => state.currency.isLoading;

export const selectCurrencyError = state => state.currency.error;