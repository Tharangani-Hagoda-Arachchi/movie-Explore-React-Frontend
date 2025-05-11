import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography, Box, CircularProgress, Card, CardMedia,
  CardContent, Grid, Rating, IconButton, Button
} from '@mui/material';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie`,
            {
              params: {
                api_key: '40754d07f053d301eb5480ae894fdaca', // TMDb API key
                query: query,
              },
            }
          );
          setResults(response.data.results);
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }
  }, [query]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };


  return (
    <Box p={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Search Results for "{query}"
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : results.length > 0 ? (
        <>
          <Grid container spacing={8} pl={2}>
            {results.slice(0, visibleCount).map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <Card sx={{ height: 350, width: 300, position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    objectFit ='cover'
                    
                    image={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=No+Image'
                    }
                    alt={movie.title}
                    onClick={() => handleCardClick(movie.id)}
                  />
                  
                  <CardContent onClick={() => handleCardClick(movie.id)} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {movie.title}
                    </Typography>
                    <Box sx={{ display: 'inline', justifyContent: 'space-between' }}>
                      <Typography variant="body1" color="textSecondary">
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : 'N/A'}
                      </Typography>
                      <Rating
                        name="read-only"
                        value={movie.vote_average / 2}
                        precision={0.5}
                        readOnly
                        size="medium"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {visibleCount < results.length && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button variant="contained" onClick={handleLoadMore}>
                Load More
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Typography>No results found.</Typography>
      )}
    </Box>
  );
};

export default SearchResults;
