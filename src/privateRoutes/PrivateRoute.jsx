import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Box, CircularProgress } from "@mui/material"

const PrivateRoute = () => {
    const [auth, setAuth] = useState(null); // null = loading, false = not auth, true = auth

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setAuth(false);
            return;
        }

        axios.get('http://localhost:4000/api/auths/verify-token', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => setAuth(true))
            .catch(() => setAuth(false));
    }, []);

    if (auth === null)
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        )

    return auth ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
