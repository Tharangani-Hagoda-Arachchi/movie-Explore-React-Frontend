import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MoveiCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FavoritePage = ({darkMode, setDarkMode }) => {
    const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);
  return (
    
    <div>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <h2>Your Favorite Movies</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    
      {favorites.map(movie => (
        
        <MovieCard key={movie.id} movie={movie} />
      ))}
      <Footer />

    </div>
    </div>
  )
}

export default FavoritePage