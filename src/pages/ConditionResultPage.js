// src/pages/ConditionResultPage.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Button, Paper, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For self-care tips
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // For when to see a doctor
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // For disclaimer
import LocationOnIcon from '@mui/icons-material/LocationOn'; // For resources
import PhoneIcon from '@mui/icons-material/Phone';
import WebIcon from '@mui/icons-material/Web';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // General medical icon

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';

function ConditionResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  useEffect(() => {
    if (location.state && location.state.diagnosisResult) {
      setDiagnosisResult(location.state.diagnosisResult);
    } else {
      // If no result, redirect to symptom selection or home
      navigate('/select-symptoms');
    }
  }, [location.state, navigate]);

  if (!diagnosisResult) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #a9d0f0 0%, #ffcdd2 100%)' }}>
        <Typography variant="h6" color="text.secondary">Loading results...</Typography>
      </Box>
    );
  }

  // Function to render formatted AI text, now with better bolding and list support
  const renderFormattedText = (text) => {
    if (!text) return null;

    // Split text by lines, then process each line for bolding and potential list items
    return text.split('\n').map((line, lineIndex) => {
      line = line.trim();
      if (!line) return null; // Skip empty lines

      // Check if it's a list item (e.g., starts with - or *)
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItemContent = line.substring(2); // Remove list bullet
        return (
          <ListItem key={`${lineIndex}-li`} sx={{ py: 0.5, pl: 2, alignItems: 'flex-start' }}>
            <ListItemIcon sx={{ minWidth: 24, mt: 0.5 }}>
                <MedicalServicesIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                listItemContent.split(/(\*\*.*?\*\*)/g).map((part, pIdx) =>
                  part.startsWith('**') && part.endsWith('**') ? (
                    <Typography component="span" key={pIdx} sx={{ fontWeight: 'bold' }}>
                      {part.replace(/\*\*/g, '')}
                    </Typography>
                  ) : (
                    <Typography component="span" key={pIdx}>
                      {part}
                    </Typography>
                  )
                )
              }
            />
          </ListItem>
        );
      } else {
        // Regular paragraph, process for bolding
        return (
          <Typography key={lineIndex} variant="body1" sx={{ mb: 1.5, color: 'text.primary', lineHeight: 1.6 }}>
            {line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <Typography component="span" key={pIdx} sx={{ fontWeight: 'bold' }}>
                  {part.replace(/\*\*/g, '')}
                </Typography>
              ) : (
                <Typography component="span" key={pIdx}>
                  {part}
                </Typography>
              )
            )}
          </Typography>
        );
      }
    });
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
          Your AI Guidance
        </Typography>

        <Card raised sx={{ p: 4, mb: 4, textAlign: 'left', width: '100%', borderRadius: 2 }}>
          <CardContent>
            {diagnosisResult.aiResponse ? (
                // Render the main AI response first
                renderFormattedText(diagnosisResult.aiResponse)
            ) : (
                <Typography variant="body1" color="text.secondary">
                    No AI guidance available for the selected symptoms.
                </Typography>
            )}

            {/* Structured Recommendations (Self-Care & When to See Doctor) */}
            {diagnosisResult.structuredData && diagnosisResult.structuredData.recommendations.length > 0 && (
                <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #eee' }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.dark', fontWeight: 'bold' }}>
                        More Specific Advice
                    </Typography>
                    <List disablePadding>
                        {diagnosisResult.structuredData.recommendations.map((rec, index) => (
                            <ListItem key={index} sx={{ alignItems: 'flex-start', py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                                    {rec.type === 'self_care' ? <CheckCircleOutlineIcon color="success" /> : <WarningAmberIcon color="warning" />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                            <Typography component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>{rec.type === 'self_care' ? 'Self-Care Tip:' : 'When to See a Doctor:'}</Typography>
                                            {rec.advice}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {/* NYC Resources */}
            {diagnosisResult.structuredData && diagnosisResult.structuredData.resources.length > 0 && (
                <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #eee' }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.dark', fontWeight: 'bold' }}>
                        NYC Health Resources
                    </Typography>
                    <List disablePadding>
                        {diagnosisResult.structuredData.resources.map((res, index) => (
                            <ListItem key={index} sx={{ alignItems: 'flex-start', py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                                    <LocationOnIcon color="info" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            <Typography component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{res.name} ({res.type.replace(/_/g, ' ')}):</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {res.address}
                                                {res.phone && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                                        <PhoneIcon sx={{ fontSize: 'small', mr: 0.5 }} /> {res.phone}
                                                    </Box>
                                                )}
                                                {res.website && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                                        <WebIcon sx={{ fontSize: 'small', mr: 0.5 }} />
                                                        <a href={res.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                                                            {res.website}
                                                        </a>
                                                    </Box>
                                                )}
                                                {res.notes && ` (${res.notes})`}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

          </CardContent>
        </Card>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/select-symptoms')}
            sx={{ px: 4, py: 1.5 }}
          >
            Select More Symptoms
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/')}
            sx={{ px: 4, py: 1.5 }}
          >
            Start Over
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

export default ConditionResultPage;