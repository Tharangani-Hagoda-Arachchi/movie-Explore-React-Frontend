
const loginFormStyles = {
    container: {
        mt: 8,
        px: 1,// for small devices

    },

    transparentBox: {
        p: {
            xs: 2,
            sm: 3
        },
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 'none',
        border: '2px solid #fff',
        width: '100%',
        maxWidth: '100%',
        //medium screens
        '@media (min-width: 400px)': {
            maxWidth: '360px',
        },
        //larger screen
        '@media (min-width: 600px)': {
            maxWidth: '420px',
        },
        //larger screen tablets/desktops
        '@media (min-width: 1024px)': {
            maxWidth: '480px',
        },

    },

    title: {
        textAlign: "center",
        mb: 2,

        fontSize: {
            xs: "1.5rem",
            sm: "2rem",
        },
        fontWeight: 600,
        color: '#fff',
    },

    form: {
        mt: 1,
        width: '100%',
    },

    textField: {
        mb: 2,
        '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
            backgroundColor: 'transparent',
            color: '#fff',
        },
        '& .MuiInputLabel-root': {
            color: '#ccc',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ccc',
        },
    },

    button: {
        mt: 1,
        py: 1.2,
        fontWeight: 'bold',
        borderRadius: '15px',
    },

    registerLink: {
        mt: 3,
        color: '#ccc',
    }
};

export default loginFormStyles;
