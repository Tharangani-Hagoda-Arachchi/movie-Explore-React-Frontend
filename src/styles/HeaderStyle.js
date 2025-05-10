const headerStyles = {

    appBar: {
        position: 'static',
        backgroundColor: '#0d1b2a',
    },

    toolbar: {
        justifyContent: 'space-between',
        px: { xs: 1, sm: 2 },
    },

    logoBox: {
        display: 'flex',
        alignItems: 'center',

    },

    logoText: {
        fontSize: { xs: '1rem', sm: '1.25rem' },
        mr: 1,
        color: '#fff',
    },

    iconGroup: {
        display: 'flex',
        alignItems: 'center',
    },

    iconButton: {
        color: '#ffffff', // white by default
        '&:hover': {
            color: '#90caf9', // light blue on hover
        },
    },


    drawerBox: {
        p: 2,
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.paper',
    },

    mobileSearch: {
        width: '100%',
    },

    searchWrapper: {
        position: 'relative',
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.15)',
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.25)',
        },
        marginLeft: 2,
        width: '100%',
        maxWidth: { xs: '100%', sm: '250px' },
    },

    searchIconWrapper: {
        padding: (theme) => theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
    },

    searchInput: {
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: (theme) => theme.spacing(1, 1, 1, 0),
            paddingLeft: (theme) => `calc(1em + ${theme.spacing(4)})`,
            transition: (theme) => theme.transitions.create('width'),
            width: '100%',
        },
    },
};




export default headerStyles;
