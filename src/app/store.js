import { configureStore } from '@reduxjs/toolkit';
import trendingReducer from '../features/trending/weekTrendigs'
import movieReducer from '../features/trending/moveieSlice';



export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    movie: movieReducer,
  },
});

