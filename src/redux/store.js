import { configureStore } from '@reduxjs/toolkit';

import statisticsReducer from './statistics/statisticsSlice';
import currencyReducer from './currency/currencySlice';

export const store = configureStore({
  reducer: {
    statistics: statisticsReducer,
    currency: currencyReducer,
  },
});