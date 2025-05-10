import { configureStore } from '@reduxjs/toolkit';
import trendingReducer from '../features/trending/weekTrendigs'


export const store = configureStore({
  reducer: {
    trending: trendingReducer,
  },
});
