// src/pages/ContactPage.js
import React from 'react';
import { Box, Typography, Container, Button, Link } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function ContactPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e0eaf4 0%, #c4d4e0 100%)', // Another light gradient
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 2 }}>
          Have questions or feedback about MediGuid NYC? We'd love to hear from you!
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 2 }}>
          For general inquiries, please email us at:
          <br />
          <Link href="mailto:info@mediguidnyc.com" target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 'bold' }}>
            info@mediguidnyc.com
          </Link>
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 2 }}>
          **Please note:** We cannot provide medical advice via email or phone. If you have
          health concerns, please consult a qualified healthcare professional.
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

export default ContactPage;