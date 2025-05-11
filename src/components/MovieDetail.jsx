// src/pages/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Grid,
  CardMedia,
  Avatar,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, toggleFavorite } from '../features/trending/moveieSlice'
import { movieDetailStyles as styles } from '../styles/MovieDetailStyle';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { movie, credits, trailerKey, loading, favorites } = useSelector((state) => state.movie);

  const [openTrailerDialog, setOpenTrailerDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(movie.id));
  };

  const handleOpenTrailerDialog = () => setOpenTrailerDialog(true);
  const handleCloseTrailerDialog = () => setOpenTrailerDialog(false);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (!movie) return <Typography>Error loading movie details.</Typography>;

  const { title, overview, backdrop_path, vote_average, genres, runtime } = movie || {};
  const cast = credits?.cast?.slice(0, 6) || [];
  const director = credits?.crew?.find((person) => person.job === 'Director') || {};
  const writer = credits?.crew?.find((person) => person.job === 'Writer' || person.job === 'Screenplay') || {};

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt={title}
        sx={styles.backdrop}
      />

      <Box sx={styles.titleWrapper}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>{title}</Typography>
        <IconButton onClick={handleFavoriteToggle} color="error">
          {favorites.includes(movie.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      <Typography variant="body1" sx={styles.overview}>{overview}</Typography>

      <Box sx={styles.ratingInfo}>
        <StarIcon sx={{ color: 'gold', mr: 1 }} />
        <Typography variant="body1">{vote_average}</Typography>
        <Typography variant="body2" sx={{ ml: 3 }}>Duration: {runtime} mins</Typography>
      </Box>

      <Box sx={styles.genres}>
        {genres?.map((genre) => (
          <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>

      <Box sx={{ mb: 3 }}>
        {director.name && (
          <Typography variant="body1"><strong>Director:</strong> {director.name}</Typography>
        )}
        {writer.name && (
          <Typography variant="body1"><strong>Writer:</strong> {writer.name}</Typography>
        )}
      </Box>

      <Button variant="contained" onClick={handleOpenTrailerDialog} sx={styles.trailerButton}>
        Watch Trailer
      </Button>

      <Dialog open={openTrailerDialog} onClose={handleCloseTrailerDialog} maxWidth="lg" fullWidth>
        <DialogTitle>Movie Trailer</DialogTitle>
        <DialogContent>
          <Box sx={styles.trailerBox}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer"
              style={styles.trailerFrame}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTrailerDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <Box>
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid container spacing={2}>
          {cast.map((actor) => (
            <Grid item xs={6} sm={4} md={2} key={actor.id}>
              <Paper elevation={3} sx={{ p: 1, textAlign: 'center', borderRadius: 2 }}>
                <Avatar
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  sx={styles.castAvatar}
                />
                <Typography variant="body2" fontWeight="bold">{actor.name}</Typography>
                <Typography variant="caption" color="text.secondary">as {actor.character}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MovieDetail;
