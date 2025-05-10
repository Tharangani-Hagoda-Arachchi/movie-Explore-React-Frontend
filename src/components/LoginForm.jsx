import React from 'react'
import { Box, Container, Typography, TextField, Button, Link } from "@mui/material"
import loginFormStyles from '../styles/LoginFormStyle'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const LoginForm = () => {

    //validation schema
    const validationSchema = Yup.object({
        userName: Yup.string().required('Username is required'),
        userPassword: Yup.string().required('Password is required'),
    });

    const navigate = useNavigate();

    //inetialized the values
    const intialValues = {
        userName: '',
        userPassword: '',
    };

    // handle form submit
    const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
        setStatus(null);
        try {
            const response = await axios.post('http://localhost:4000/api/auths/login', {
                userName: values.userName,
                userPassword: values.userPassword
            })

            localStorage.setItem('token', response.data.accessToken);

            // Show success or redirect
            setStatus({ success: true, message: 'Registration successful! Redirecting to Home...' })

            resetForm()
            setSubmitting(false)

            //navigate home to after
            navigate('/home')


        } catch (error) {
            console.error('Login error:', error.response?.data || error.message)
            const message = error.response?.data?.message || 'Login failed. Please try again.'
            setStatus({ success: false, message })

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container maxWidth='sm' sx={loginFormStyles.container}>
            <Box sx={loginFormStyles.transparentBox}>
                <Typography component='h1' variant='h' sx={loginFormStyles.title}>SIGN IN</Typography>
                <Formik initialValues={intialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleChange, isSubmitting, status }) => (
                        <Form noValidate sx={loginFormStyles.form}>

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
                                sx={loginFormStyles.textField}
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
                                sx={loginFormStyles.textField}
                            />
                            <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={loginFormStyles.button}>
                                Sign In
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

                            <Typography variant="body2" align="center" sx={loginFormStyles.registerLink}>
                                Create new account{' '}
                                <Link component={RouterLink} to="/register" >
                                    Sign up
                                </Link>
                            </Typography>
                        </Form>

                    )}


                </Formik>

            </Box>
        </Container>
    )
}

export default LoginForm
