import React from 'react'
import { Box } from '@mui/material';
import LoginForm from '../components/LoginForm';
import backgroundImage from '../assets/registration-brackground.jpg'
import loginPageStyles from '../styles/LoginPageStyle';

const LoginPage = () => {
    return (
        //add background image
        <Box
            sx={{
                ...loginPageStyles.backgroundWrapper,
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <Box sx={loginPageStyles.formContainer}>
                <LoginForm />
            </Box>
        </Box>
    )
}

export default LoginPage
