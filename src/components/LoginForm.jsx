import React from 'react'
import {Box, Container, Typography,TextField,Button,Link} from "@mui/material"
import loginFormStyles from '../styles/LoginFormStyle'
import { Link as RouterLink } from 'react-router-dom'


const LoginForm = () => {
  return (
    <Container maxWidth='sm' sx={loginFormStyles.container}>
    <Box sx={loginFormStyles.transparentBox}>
     <Typography component='h1' variant='h'sx={loginFormStyles.title}>SIGN IN</Typography>
     <Box component="form"  noValidate sx={loginFormStyles.form}>
      <TextField
        placeholder="Enter username"
        fullWidth
        required
        autoFocus
        sx={loginFormStyles.textField}
      />
      <TextField
        placeholder="Enter password"
        fullWidth
        required
        type="password"
        sx={loginFormStyles.textField}   
      />
      <Button type="submit" variant="contained" fullWidth sx={loginFormStyles.button}>
        Sign In
      </Button>
      <Typography variant="body2" align="center" sx={loginFormStyles.registerLink}>
        Create new account{' '}
        <Link component={RouterLink} to="/register" >
          Sign up
        </Link>
      </Typography>
    </Box>
    </Box>   
</Container>
  )
}

export default LoginForm