// src/slices/movieSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '40754d07f053d301eb5480ae894fdaca';

export const fetchMovieDetails = createAsyncThunk(
  'movie/fetchMovieDetails',
  async (id) => {
    const [detailsRes, creditsRes, videosRes] = await Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
      axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`),
      axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
    ]);

    const trailer = videosRes.data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');

    return {
      movie: detailsRes.data,
      credits: creditsRes.data,
      trailerKey: trailer?.key || null,
    };
  }
);

const getFavoriteIds = () => JSON.parse(localStorage.getItem('favorites')) || [];

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movie: null,
    credits: null,
    trailerKey: null,
    loading: false,
    error: null,
    favorites: getFavoriteIds(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(fid => fid !== id);
      } else {
        state.favorites.push(id);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload.movie;
        state.credits = action.payload.credits;
        state.trailerKey = action.payload.trailerKey;
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load movie details.';
      });
  },
});

export const { toggleFavorite } = movieSlice.actions;
export default movieSlice.reducer;
