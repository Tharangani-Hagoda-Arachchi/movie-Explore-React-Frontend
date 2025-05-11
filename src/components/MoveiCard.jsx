import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import movieCardStyles from '../styles/MoveiCardStyle'; // Make sure this is a function

const MovieCard = ({ movie }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const styles = typeof movieCardStyles === 'function' ? movieCardStyles(theme) : movieCardStyles;

  const {
    id,
    title,
    poster_path,
    release_date,
    vote_average,
  } = movie;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const handleCardClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <Card sx={styles.card}>
      <Box onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          sx={styles.media}
        />
        <CardContent>
          <Box sx={styles.titleSection}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              noWrap
              sx={{ color: theme.palette.text.primary }}
            >
              {title}
            </Typography>
            {/* Prevent icon click from triggering navigation */}
            <IconButton
              color="primary"
              onClick={(e) => e.stopPropagation()} 
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
          <Typography sx={{ ...styles.releaseText, color: theme.palette.text.secondary }}>
            {release_date ? new Date(release_date).getFullYear() : 'N/A'}
          </Typography>
          <Box sx={styles.ratingBox}>
            <StarIcon color="warning" fontSize="small" />
            <Typography sx={{ ...styles.ratingText, color: theme.palette.text.primary }}>
              {vote_average ?? 'N/A'}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default MovieCard;
