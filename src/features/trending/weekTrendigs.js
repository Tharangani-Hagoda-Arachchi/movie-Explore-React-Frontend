import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const VALID_API_KEY ='40754d07f053d301eb5480ae894fdaca';
const TMDB_TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${VALID_API_KEY}`;
console.log('Using API KEY:', process.env.API_KEY);


export const fetchTrendingMovies = createAsyncThunk(
  'trending/fetchTrendingMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(TMDB_TRENDING_URL);
      return response.data.results;
    } catch (error) {
      return rejectWithValue('Failed to fetch trending movies');
    }
  }
);

const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default trendingSlice.reducer;
