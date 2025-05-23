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
import axios from 'axios';
import { movieDetailStyles as styles } from '../styles/MovieDetailStyle';

const API_KEY = '40754d07f053d301eb5480ae894fdaca';

const getFavoriteIds = () => JSON.parse(localStorage.getItem('favorites')) || [];
const toggleFavorite = (movieId) => {
  const current = getFavoriteIds();
  const updated = current.includes(movieId)
    ? current.filter(id => id !== movieId)
    : [...current, movieId];
  localStorage.setItem('favorites', JSON.stringify(updated));
  return updated;
};

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState(getFavoriteIds());
  const [openTrailerDialog, setOpenTrailerDialog] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const [detailsRes, creditsRes, videosRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
        ]);

        setMovie(detailsRes.data);
        setCredits(creditsRes.data);

        const trailer = videosRes.data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteToggle = (movieId) => {
    const updated = toggleFavorite(movieId);
    setFavoriteIds(updated);
  };

  const handleOpenTrailerDialog = () => setOpenTrailerDialog(true);
  const handleCloseTrailerDialog = () => setOpenTrailerDialog(false);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (!movie) return <Typography>Error loading movie details.</Typography>;

  const { title, overview, backdrop_path, vote_average, genres, runtime } = movie || {};
  const cast = credits?.cast?.slice(0, 6) || [];
  const director = credits?.crew?.find((person) => person.job === 'Director');
  const writer = credits?.crew?.find((person) => person.job === 'Writer' || person.job === 'Screenplay');

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
        <IconButton onClick={() => handleFavoriteToggle(movie.id)} color="error">
          {favoriteIds.includes(movie.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
        {director && (
          <Typography variant="body1"><strong>Director:</strong> {director.name}</Typography>
        )}
        {writer && (
          <Typography variant="body1"><strong>Writer:</strong> {writer.name}</Typography>
        )}
      </Box>

      <Button
        variant="contained"
        onClick={handleOpenTrailerDialog}
        sx={styles.trailerButton}
      >
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
          <Button onClick={handleCloseTrailerDialog} color="primary">
            Close
          </Button>
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
