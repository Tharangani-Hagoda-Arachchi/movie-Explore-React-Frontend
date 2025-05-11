import React, { useState, useMemo, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box,
  Drawer, InputBase, useMediaQuery
} from '@mui/material';
import { darkTheme, lightTheme } from '../themes/ModeThemes';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import headerStyles from '../styles/HeaderStyle';
import TheamToggleButton from './TheamToggleButton';
import { useNavigate } from 'react-router-dom';

const Header = ({ darkMode, setDarkMode }) => {
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearchQuery');
    if (lastSearch) {
      setSearchQuery(lastSearch);
    }
  }, []);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      localStorage.setItem('lastSearchQuery', trimmedQuery); 
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setMobileSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <AppBar sx={headerStyles.appBar}>
        <Toolbar sx={headerStyles.toolbar}>
          <Box sx={headerStyles.logoBox}>
            <Typography sx={headerStyles.logoText}>MovieApp</Typography>
            <IconButton sx={headerStyles.iconButton} onClick={() => navigate('/home')}>
              <HomeIcon />
            </IconButton>
          </Box>

          <Box sx={headerStyles.iconGroup}>
            {isTablet ? (
              <Box sx={headerStyles.searchWrapper}>
                <Box sx={headerStyles.searchIconWrapper}><SearchIcon /></Box>
                <InputBase
                  placeholder="Search…"
                  sx={headerStyles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </Box>
            ) : (
              <IconButton sx={headerStyles.iconButton} onClick={() => setMobileSearchOpen(true)}>
                <SearchIcon />
              </IconButton>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton sx={headerStyles.iconButton} onClick={() => navigate('/favourite')}><FavoriteIcon /></IconButton>
              <IconButton sx={headerStyles.iconButton} onClick={() => navigate('/')}><LogoutIcon /></IconButton>
              <TheamToggleButton darkMode={darkMode} setDarkMode={setDarkMode} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="top" open={mobileSearchOpen} onClose={() => setMobileSearchOpen(false)}>
        <Box sx={headerStyles.drawerBox}>
          <Box sx={headerStyles.mobileSearch}>
            <Box sx={headerStyles.searchWrapper}>
              <Box sx={headerStyles.searchIconWrapper}><SearchIcon /></Box>
              <InputBase
                autoFocus
                placeholder="Search…"
                sx={headerStyles.searchInput}
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
