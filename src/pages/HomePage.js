// src/pages/HomePage.js
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import CustomSearchBar from '../components/CustomSearchBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function HomePage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSearch = (query) => {
    console.log("Search initiated with query:", query);
    // For now, we'll just navigate to the symptom selection page.
    // In a more advanced version, 'query' could pre-fill symptom selection or suggest categories.
    navigate('/select-symptoms'); // Navigate to the symptom selection page
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #78b5e2 0%, #e57373 100%)',
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Adjusted centering of content within the container */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
          MediGuid NYC
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'text.secondary', mb: 6 }}>
          Your AI Medical Assistant for non-emergency guidance in NYC.
        </Typography>

        <CustomSearchBar onSearch={handleSearch} />

        <Box sx={{ mt: 8, maxWidth: '600px', mx: 'auto' }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                Get quick, reliable information about common health concerns. Select your symptoms to receive personalized advice, self-care tips, and guidance on when to seek professional medical attention in New York City.
            </Typography>
        </Box>

      </Container>

      <Footer />
    </Box>
  );
}

export default HomePage;