import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../features/trending/Populer';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
} from '@mui/material';
import MovieCard from './MoveiCard';

const PopularMovies = () => {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(4); // 👈 Initially show 8

  const popularState = useSelector((state) => state.popular ?? {});
  const { popular = [], loading = false, error = null } = popularState;

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8); // 👈 Load 8 more each time
  };

  return (
    <Container maxWidth="ls" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant="h4"
        fontWeight={600}
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          textAlign: { xs: 'center', sm: 'left' },
          mb: { xs: 2, md: 3 },
        }}
      >
        Popular Movies
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '30vh' }}>
          <CircularProgress size={40} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={{ xs: 3, sm: 3, md: 4 }}>
        {popular.slice(0, visibleCount).map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {visibleCount < popular.length && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PopularMovies;
