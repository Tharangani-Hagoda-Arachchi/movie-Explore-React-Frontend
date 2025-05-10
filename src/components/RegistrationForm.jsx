import React from 'react'
import {Box, Container, Typography,TextField,FormControlLabel,Checkbox,Button,Link} from "@mui/material"
import registrationFormStyles from '../styles/RegistrationFromStyle'
import {  Link as RouterLink, useNavigate } from 'react-router-dom'
import { Formik,Form,} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

//password valdation regex
const passwordVallidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/

// validation schema usinf Yup
const validationSchema = Yup.object({
  userName: Yup.string().required('Username is required'),
  userPassword: Yup.string()
    .matches(passwordVallidation, 'Password must be at least 6 characters and include uppercase, lowercase, number, and special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('userPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
  agree: Yup.bool().oneOf([true], 'You must agree to terms')
})

const RegistrationForm = () => {

  // inetialze the values
  const intialValues ={
    userName: '',
    userPassword: '',
    confirmPassword: '',
    agree: false

  }

  // form submition hanndle
  const navigate = useNavigate()
  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      //POST request to your backend API
      const response = await axios.post('http://localhost:4000/api/auths/signup', {
        userName: values.userName,
        userPassword: values.userPassword
      })
  
      // Show success or redirect
      setStatus({ success: true, message: 'Registration successful! Redirecting to login...' })

      resetForm()
      setSubmitting(false)
      
      //navigate loging to after 2s
      setTimeout(() => {
        navigate('/') 
      }, 2000)

    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message)
      const message =error.response?.data?.message || 'Registration failed. Please try again.'
      setStatus({ success: false, message })
      
    } finally {
      setSubmitting(false)
    }
}
  
  return (
    <Container maxWidth='sm' sx={registrationFormStyles.container}>
        <Box sx={registrationFormStyles.transparentBox}>
         <Typography component='h1' variant='h'sx={registrationFormStyles.title}>SIGN UP</Typography>
         <Formik 
         initialValues={intialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          >
            {
              ({  errors, touched, isSubmitting, handleChange, values,status }) =>(
                <Form noValidate sx={registrationFormStyles.form}>
                <TextField
                  placeholder="Enter username"
                  fullWidth
                  required
                  autoFocus
                  name='userName'
                  value={values.userName}
                  onChange={handleChange}
                  error={touched.userName && Boolean(errors.userName)}
                  helperText={touched.userName && errors.userName}
                  sx={registrationFormStyles.textField}
                />
               <TextField
                  placeholder="Enter password"
                  fullWidth
                  required
                  type="password"
                  name='userPassword'
                  value={values.userPassword}
                  onChange={handleChange}
                  error={touched.userPassword && Boolean(errors.userPassword)}
                  helperText={touched.userPassword && errors.userPassword}
                  sx={registrationFormStyles.textField}   
                />
                <TextField
                  placeholder="Re-Enter password"
                  fullWidth
                  required
                  type="password"
                  name='confirmPassword'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={registrationFormStyles.textField}
                />
                <FormControlLabel
                  control={<Checkbox value="agree" color="primary" name='agree'checked={values.agree}
                  onChange={handleChange} />}
                  label="Agree Terms and Conditions" 
                  sx={registrationFormStyles.checkbox}
                />
                
                {touched.agree && errors.agree && (
                  <Typography color="error" variant="caption" sx={{ ml: 5 }}>
                    {errors.agree}
                  </Typography>
                )}

                <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={registrationFormStyles.button}>
                  Sign Up
                </Button>
                
                {status?.message && (
                  <Typography
                    variant="body2"
                    align="center"
                    color={status.success ? 'success.main' : 'error'}
                    sx={{ mt: 2 }}
                  >
                    {status.message}
                  </Typography>
                )}
                
                <Typography variant="body2" align="center" sx={registrationFormStyles.loginLink}>
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/">
                    Log in
                  </Link>
                </Typography>

              </Form>
            )
            }

         </Formik>
        </Box>   
    </Container>
  )
}

export default RegistrationForm