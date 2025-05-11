import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';

const FavouriteButten = () => {
    const [isFavorite, setIsFavorite] = useState(false);

  useEffect(({movie}) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites.some(fav => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    let updatedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      updatedFavorites = updatedFavorites.filter(fav => fav.id !== movie.id);
    } else {
      updatedFavorites.push(movie);
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <IconButton onClick={toggleFavorite} color={isFavorite ? 'error' : 'default'}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  )
}

export default FavouriteButten