import React from 'react'
import { Box, Typography, useTheme } from '@mui/material';
import footerStyles from '../styles/FooterStyle';


const Footer = () => {
    const theme = useTheme();
    return (
        <Box sx={footerStyles.footerContainer(theme)}>
            <Typography sx={footerStyles.footerText(theme)}>
                © {new Date().getFullYear()} MovieApp. All rights reserved.
            </Typography>
        </Box>
    )
}

export default Footer
