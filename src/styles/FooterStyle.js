const footerStyles = {
    footerContainer: (theme) => ({
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        textAlign: 'center',
        py: 2,
        mt: 'auto',
    }),

    footerText: (theme) => ({
        fontSize: { xs: '0.8rem', sm: '1rem' },
        color: theme.palette.text.secondary,
    }),
};

export default footerStyles;
