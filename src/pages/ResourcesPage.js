// src/pages/ResourcesPage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, CircularProgress, Alert, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import WebIcon from '@mui/icons-material/Web';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Generic icon for resource type
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResourcesPage() {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resources');
        setResources(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError('Failed to load resources. Please try again later.');
        setLoading(false);
      }
    };

    fetchResources();
  }, []); // Empty dependency array to run once on mount

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e6f2ff 0%, #ccf0ff 100%)', // A light blue gradient
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
          NYC Health Resources
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Here's a list of general health resources available in New York City.
        </Typography>

        {loading ? (
          <CircularProgress sx={{ color: 'primary.main', my: 4 }} />
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            {error}
          </Alert>
        ) : (
          <Box sx={{ width: '100%' }}>
            {resources.length > 0 ? (
              <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                {resources.map((resource, index) => (
                  <React.Fragment key={resource.id}>
                    <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {/* Choose icon based on resource type, or default to MedicalServicesIcon */}
                        {resource.type === 'pharmacy' ? <MedicalServicesIcon color="info" /> :
                         resource.type === 'urgent_care_advice' ? <MedicalServicesIcon color="warning" /> :
                         resource.type === 'general_clinic' ? <MedicalServicesIcon color="primary" /> :
                         resource.type === 'telehealth' ? <MedicalServicesIcon color="secondary" /> :
                         <MedicalServicesIcon color="action" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 0.5 }}>
                            {resource.name} ({resource.type.replace(/_/g, ' ')})
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography variant="body2" color="text.secondary">
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <LocationOnIcon sx={{ fontSize: 'small', mr: 0.5 }} /> {resource.address}
                              </Box>
                              {resource.phone && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                  <PhoneIcon sx={{ fontSize: 'small', mr: 0.5 }} /> {resource.phone}
                                </Box>
                              )}
                              {resource.website && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                  <WebIcon sx={{ fontSize: 'small', mr: 0.5 }} />
                                  <a href={resource.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                                    {resource.website}
                                  </a>
                                </Box>
                              )}
                              {resource.notes && (
                                <Typography variant="caption" display="block" sx={{ mt: 1, fontStyle: 'italic', color: 'text.disabled' }}>
                                  Notes: {resource.notes}
                                </Typography>
                              )}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {index < resources.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No resources found.
              </Typography>
            )}
          </Box>
        )}

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

export default ResourcesPage;