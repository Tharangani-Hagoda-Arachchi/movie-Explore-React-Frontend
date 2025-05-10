import RegistrationPage from "./pages/RegistrationPage";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
      <CssBaseline/>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
