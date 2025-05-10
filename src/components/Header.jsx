import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, InputBase, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import headerStyles from '../styles/HeaderStyle';



const Header = () => {

    const theme = useTheme();
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
                            <IconButton sx={headerStyles.iconButton} onClick={() => setMobileSearchOpen(true)}><SearchIcon /></IconButton>
                        )}
                        <IconButton sx={headerStyles.iconButton}><FavoriteIcon /></IconButton>
                        <IconButton sx={headerStyles.iconButton}><LogoutIcon /></IconButton>
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

