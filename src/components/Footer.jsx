import React from 'react'
import { Box, Typography } from '@mui/material';
import footerStyles from '../styles/FooterStyle';


const Footer = () => {
    return (
        <Box sx={footerStyles.footerContainer}>
            <Typography sx={footerStyles.footerText}>
                © {new Date().getFullYear()} MovieApp. All rights reserved.
            </Typography>
        </Box>
    )
}

export default Footer
