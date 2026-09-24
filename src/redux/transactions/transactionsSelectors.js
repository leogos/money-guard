export const selectTransactions = state => state.transactions.items;
export const selectIsLoading = state => state.transactions.isLoading;
export const selectError = state => state.transactions.error;

export const selectBalance = state => {
  return state.transactions.items.reduce((total, transaction) => {
    const amount = Number(transaction.sum);
    return transaction.type === 'income' ? total + amount : total - amount;
  }, 0);
};

export const selectTransactionsLoading = state =>
  state.transactions.isLoading;

export const selectTransactionsError = state => state.transactions.error;
