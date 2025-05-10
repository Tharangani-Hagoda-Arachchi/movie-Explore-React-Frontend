import React from 'react'
import { Box } from '@mui/material';
import RegistrationForm from '../components/RegistrationForm'
import backgroundImage from '../assets/registration-brackground.jpg'
import registrationPageStyles from '../styles/RegistrationPagestyle.js';

const RegistrationPage = () => {
  return (
    //add background image
    <Box
      sx={{
        ...registrationPageStyles.backgroundWrapper,
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Box sx={registrationPageStyles.formContainer}>
        <RegistrationForm />
      </Box>
    </Box>

  )
}

export default RegistrationPage
