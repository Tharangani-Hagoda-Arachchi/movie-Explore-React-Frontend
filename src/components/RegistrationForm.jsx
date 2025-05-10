import React from 'react'
import {Box, Container, Typography,TextField,FormControlLabel,Checkbox,Button,Link} from "@mui/material"
import registrationFormStyles from '../styles/RegistrationFromStyle'

const RegistrationForm = () => {
  return (
    <Container maxWidth='sm' sx={registrationFormStyles.container}>
        <Box sx={registrationFormStyles.transparentBox}>
         <Typography component='h1' variant='h'sx={registrationFormStyles.title}>SIGN UP</Typography>
         <Box component="form"  noValidate sx={registrationFormStyles.form}>
          <TextField
            placeholder="Enter username"
            fullWidth
            required
            autoFocus
            sx={registrationFormStyles.textField}
          />
         <TextField
            placeholder="Enter password"
            fullWidth
            required
            type="password"
            sx={registrationFormStyles.textField}   
          />
          <TextField
            placeholder="Re-Enter password"
            fullWidth
            required
             type="password"
             sx={registrationFormStyles.textField}
          />
          <FormControlLabel
            control={<Checkbox value="agree" color="primary" />}
            label="Agree Terms and Conditions" sx={registrationFormStyles.checkbox}
          />
          <Button type="submit" variant="contained" fullWidth sx={registrationFormStyles.button}>
            Sign Up
          </Button>
          <Typography variant="body2" align="center" sx={registrationFormStyles.loginLink}>
            Already have an account?{' '}
            <Link >
              Log in
            </Link>
          </Typography>
        </Box>
        </Box>   
    </Container>
  )
}

export default RegistrationForm