// src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages
import HomePage from './pages/HomePage';
import SymptomSelectionPage from './pages/SymptomSelectionPage'; // Corrected path assuming it's in pages/pages/
import ConditionResultPage from './pages/ConditionResultPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ResourcesPage from './pages/ResourcesPage';
import ChatWidget from './components/ChatWidget'; // Import ChatWidget

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/select-symptoms" element={<SymptomSelectionPage />} />
            <Route path="/results" element={<ConditionResultPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            {/* Add a 404 Not Found route if desired */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
          <ChatWidget /> {/* Add the ChatWidget here, outside of <Routes> */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;