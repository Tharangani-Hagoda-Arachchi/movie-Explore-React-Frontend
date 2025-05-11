import React, { useState, useMemo } from 'react';
import RegistrationPage from "./pages/RegistrationPage";
import { CssBaseline, ThemeProvider, } from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import { lightTheme, darkTheme } from './themes/ModeThemes';
import MoveiDetailPage from './pages/MoveiDetailPage';
import Search from './pages/Search';
import FavoritePage from './pages/FavoritePage';




function App() {
  const [darkMode, setDarkMode] = useState(true);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/search" element={<Search darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/favourite" element={<FavoritePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/movie/:id" element={<MoveiDetailPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </ThemeProvider>

  );
}

export default App;

