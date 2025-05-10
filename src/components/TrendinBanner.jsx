import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingMovies } from '../features/trending/weekTrendigs';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  IconButton,
  Button,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TrendingBanerStyles from '../styles/TrendingBanner';

const TrendingBanner = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.trending);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [movies]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  if (loading) return <CircularProgress sx={{ m: 2 }} />;
  if (error)
    return (
      <Typography color="error" variant="body2" sx={{ m: 2 }}>
        {error}
      </Typography>
    );
  
  if (!movies.length) return null;
  
  const movie = movies[currentIndex];

  return (
    <Box sx={TrendingBanerStyles.container}>
      <Card sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          sx={TrendingBanerStyles.cardMedia}
        />

        {/* Overlay Info */}
        <Box sx={TrendingBanerStyles.overlay}>
          <Box sx={TrendingBanerStyles.contentBox}>
            <Typography variant="h4" sx={TrendingBanerStyles.title}>
              {movie.title}
            </Typography>

            <Typography variant="body2" sx={TrendingBanerStyles.overview}>
              {movie.overview}
            </Typography>

            <Box sx={TrendingBanerStyles.rating}>
              <StarIcon sx={{ color: 'gold', mr: 0.5 }} fontSize="small" />
              <Typography variant="body2">{movie.vote_average}</Typography>
              <Typography variant="body2" sx={{ ml: 2, fontSize: '0.75rem' }}>
                Views: {Math.round(movie.popularity)}
              </Typography>
            </Box>

            <Button variant="contained" color="primary" sx={TrendingBanerStyles.watchButton}>
              Watch Now
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrev}
        className="banner-controls"
        sx={{ ...TrendingBanerStyles.navButton, left: 10 }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        className="banner-controls"
        sx={{ ...TrendingBanerStyles.navButton, right: 10 }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default TrendingBanner;
