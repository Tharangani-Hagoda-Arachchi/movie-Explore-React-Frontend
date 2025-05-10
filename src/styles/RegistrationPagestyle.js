const registrationPageStyles = {
  backgroundWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: '#f0f0f0',  
    px: 2,
    flexDirection: { xs: 'column', md: 'row' },
  },

  formContainer: {
    width: '100%',
    maxWidth: 400,
    backdropFilter: 'blur(2px)',
    borderRadius: 3,
    p: 1,
    boxShadow: 3,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
};

export default registrationPageStyles;
