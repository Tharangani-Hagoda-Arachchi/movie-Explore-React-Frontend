// src/pages/MovieDetail.styles.js

export const movieDetailStyles = {
    backdrop: {
      borderRadius: 3,
      maxHeight: 500,
      mb: 3,
      objectFit: 'cover',
    },
    titleWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flexWrap: 'wrap',
    },
    overview: {
      mb: 2,
      color: 'text.primary',
    },
    ratingInfo: {
      display: 'flex',
      alignItems: 'center',
      mb: 2,
    },
    genres: {
      mb: 3,
    },
    trailerButton: {
      background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
      color: '#fff',
      borderRadius: '10px',
      display: 'inline-block',
      width: '200px',
      fontWeight: 'bold',
      textTransform: 'none',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      '&:hover': {
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.4)',
      },
      ml: 0,
      mb: 3
    },
    trailerFrame: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    trailerBox: {
      position: 'relative',
      paddingTop: '56.25%',
      height: 0,
      borderRadius: 2,
      overflow: 'hidden',
    },
    castAvatar: {
      width: 80,
      height: 80,
      mx: 'auto',
      mb: 1,
    },

    favoriteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 2,
    },

  };
  