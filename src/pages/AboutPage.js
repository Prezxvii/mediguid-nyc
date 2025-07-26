// src/pages/AboutPage.js
import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f0f4f8 0%, #d8e2dc 100%)', // Light, subtle gradient
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
          About MediGuid NYC
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 2 }}>
          MediGuid NYC is your AI-powered companion for non-emergency health guidance in New York City.
          Our mission is to provide quick, reliable information about common health concerns,
          self-care tips, and guidance on when to seek professional medical attention.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 2 }}>
          We leverage advanced AI models to analyze your symptoms and offer general advice,
          supplemented by curated local resources to help you navigate NYC's healthcare landscape.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 2 }}>
          Please remember: The information provided by MediGuid NYC is for general guidance only and
          **is not a substitute for professional medical advice, diagnosis, or treatment.** Always consult
          a qualified healthcare provider for any health concerns.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 4, px: 4, py: 1.5 }}
        >
          Back to Home
        </Button>
      </Container>

      <Footer />
    </Box>
  );
}

export default AboutPage;