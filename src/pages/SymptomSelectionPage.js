// src/pages/SymptomSelectionPage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Chip, CircularProgress, Alert } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SymptomSelectionPage() {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptomIds, setSelectedSymptomIds] = useState([]);
  const [loadingSymptoms, setLoadingSymptoms] = useState(true);
  const [loadingDiagnosis, setLoadingDiagnosis] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        // --- FIX 1: Use process.env.REACT_APP_BACKEND_URL ---
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (!backendUrl) {
          throw new Error("REACT_APP_BACKEND_URL is not defined in SymptomSelectionPage for fetching symptoms.");
        }
        const response = await axios.get(`${backendUrl}/api/symptoms`);
        // --- END FIX 1 ---
        setSymptoms(response.data);
        setLoadingSymptoms(false);
      } catch (err) {
        console.error('Error fetching symptoms:', err);
        setError('Failed to load symptoms. Please try again later.');
        setLoadingSymptoms(false);
      }
    };

    fetchSymptoms();
  }, []);

  const handleSymptomClick = (symptomId) => {
    setSelectedSymptomIds((prevSelected) => {
      if (prevSelected.includes(symptomId)) {
        return prevSelected.filter((id) => id !== symptomId);
      } else {
        return [...prevSelected, symptomId];
      }
    });
  };

  const handleSubmitSymptoms = async () => {
    if (selectedSymptomIds.length === 0) {
      setError('Please select at least one symptom to get guidance.');
      return;
    }

    setLoadingDiagnosis(true);
    setError(null);

    try {
      // --- FIX 2: Use process.env.REACT_APP_BACKEND_URL ---
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      if (!backendUrl) {
          throw new Error("REACT_APP_BACKEND_URL is not defined in SymptomSelectionPage for diagnosis.");
      }
      const response = await axios.post(`${backendUrl}/api/diagnose`, {
        selectedSymptomIds: selectedSymptomIds,
      });
      // --- END FIX 2 ---

      navigate('/results', { state: { diagnosisResult: response.data } });

    } catch (err) {
      console.error('Error getting AI diagnosis:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : 'An unexpected error occurred during diagnosis. Please try again.');
    } finally {
      setLoadingDiagnosis(false);
    }
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #a9d0f0 0%, #ffcdd2 100%)',
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
          What symptoms are you experiencing?
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Select all that apply.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            {error}
          </Alert>
        )}

        {loadingSymptoms ? (
          <CircularProgress sx={{ color: 'primary.main', my: 4 }} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.5,
              justifyContent: 'center',
              maxWidth: 700,
              mx: 'auto',
              p: 2,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.7)',
              boxShadow: '0px 4px 15px rgba(0,0,0,0.05)'
            }}
          >
            {symptoms.map((symptom) => (
              <Chip
                key={symptom.id}
                label={symptom.name}
                clickable
                onClick={() => handleSymptomClick(symptom.id)}
                color={selectedSymptomIds.includes(symptom.id) ? 'primary' : 'default'}
                variant={selectedSymptomIds.includes(symptom.id) ? 'filled' : 'outlined'}
                sx={{
                  fontWeight: selectedSymptomIds.includes(symptom.id) ? 'bold' : 'normal',
                  fontSize: '1rem',
                  p: '10px 15px',
                  borderRadius: '25px',
                  borderColor: 'primary.light',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ mt: 6, display: 'flex', gap: 2, justifyContent: 'center', width: '100%' }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/')}
            sx={{ px: 4, py: 1.5 }}
          >
            Back to Home
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitSymptoms}
            disabled={selectedSymptomIds.length === 0 || loadingDiagnosis}
            sx={{ px: 4, py: 1.5 }}
          >
            {loadingDiagnosis ? <CircularProgress size={24} color="inherit" /> : 'Get Guidance'}
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

export default SymptomSelectionPage;
