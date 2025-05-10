import React, { useState, useMemo } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, InputBase, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from '../themes/ModeThemes';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import headerStyles from '../styles/HeaderStyle';
import TheamToggleButton from './TheamToggleButton';



const Header = ({ darkMode, setDarkMode }) => {

    const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);
    const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    return (
        <>
            <AppBar sx={headerStyles.appBar}>
                <Toolbar sx={headerStyles.toolbar}>
                    <Box sx={headerStyles.logoBox}>
                        <Typography sx={headerStyles.logoText}>MovieApp</Typography>
                        <IconButton sx={headerStyles.iconButton}><HomeIcon /></IconButton>
                    </Box>

                    <Box sx={headerStyles.iconGroup}>
                        {isTablet ? (
                            <Box sx={headerStyles.searchWrapper}>
                                <Box sx={headerStyles.searchIconWrapper}><SearchIcon /></Box>
                                <InputBase placeholder="Search…" sx={headerStyles.searchInput} />
                            </Box>
                        ) : (
                            <IconButton sx={headerStyles.iconButton} onClick={() => setMobileSearchOpen(true)}><SearchIcon /></IconButton>)}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton sx={headerStyles.iconButton}><FavoriteIcon /></IconButton>
                            {/* Theme toggle icon here if added */}
                            <IconButton sx={headerStyles.iconButton}><LogoutIcon /></IconButton>
                            <TheamToggleButton darkMode={darkMode} setDarkMode={setDarkMode} />
                        </Box>
                    </Box>
                </Toolbar>

            </AppBar>

            <Drawer
                anchor="top"
                open={mobileSearchOpen}
                onClose={() => setMobileSearchOpen(false)}
            >
                <Box sx={headerStyles.drawerBox}>
                    <Box sx={headerStyles.mobileSearch}>
                        <Box sx={headerStyles.searchWrapper}>
                            <Box sx={headerStyles.searchIconWrapper}>
                                <SearchIcon />
                            </Box>
                            <InputBase
                                autoFocus
                                placeholder="Search…"
                                sx={headerStyles.searchInput}
                                inputProps={{ 'aria-label': 'search' }}
                                onKeyDown={(e) => e.key === 'Enter' && setMobileSearchOpen(false)}
                            />
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}

export default Header

