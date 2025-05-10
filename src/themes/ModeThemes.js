
import { createTheme } from '@mui/material/styles';

const commonSettings = {
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
};

export const lightTheme = createTheme({
    ...commonSettings,
    palette: {
        mode: 'light',
        primary: {
            main: '#0d1b2a', // dark blue
        },
        background: {
            default: '#f5f5f5',
            paper: '#0d1b2a',
        },
        text: {
            primary: '#0d1b2a',
            secondary: '#ffffff',
        },
    },
});

export const darkTheme = createTheme({
    ...commonSettings,
    palette: {
        mode: 'dark',
        primary: {
            main: '#0d1b2a',
        },
        background: {
            default: '#0d1b2a',
            paper: '#1b263b',
        },
        text: {
            primary: '#ffffff',
        },
    },
});
