const TrendingBanerStyles = {
    container: {
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      mb: 3,
      '&:hover .banner-controls': { opacity: 1 },
    },
    cardMedia: {
      width: '100vw',
      height: {
        xs: '60vh',
        sm: '65vh',
        md: '70vh',
      },
      objectFit: 'cover',
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      bgcolor: 'rgba(0, 0, 0, 0.4)',
      color: '#fff',
      px: 2,
      py: 2,
      display: 'flex',
      justifyContent: 'flex-start',
    },
    contentBox: {
      maxWidth: {
        xs: '90%',
        sm: '70%',
        md: '40%',
      },
    },
    title: {
      fontSize: {
        xs: '1.5rem',
        sm: '2rem',
        md: '2.5rem',
      },
      fontWeight: 700,
    },
    overview: {
      fontSize: {
        xs: '0.85rem',
        sm: '1rem',
      },
      opacity: 0.9,
      mt: 1,
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      mt: 1,
    },
    watchButton: {
      mt: 2,
      textTransform: 'none',
      fontWeight: 600,
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#fff',
      backgroundColor: 'rgba(0,0,0,0.4)',
      opacity: 0,
      transition: 'opacity 0.3s',
      '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
    },
  };
  
  export default TrendingBanerStyles;