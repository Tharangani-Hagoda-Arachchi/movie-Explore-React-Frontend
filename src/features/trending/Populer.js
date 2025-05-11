// src/features/trending/Populer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '40754d07f053d301eb5480ae894fdaca'; // API key

export const fetchPopularMovies = createAsyncThunk(
  'popular/fetchPopularMovies',
  async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    return response.data.results; // We expect an array of popular movies
  }
);

const popularSlice = createSlice({
  name: 'popular',
  initialState: {
    popular: [], // Stores the list of popular movies
    loading: false, // Whether data is being fetched
    error: null, // Stores error message if there's any
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload; // Store the fetched movies
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle error
      });
  },
});

export default popularSlice.reducer;
