// src/components/Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box sx={{
    width: '100%',
    p: 3,
    mt: 4,
    background: 'white',
    borderTop: '1px solid #eee',
    textAlign: 'center',
    }}>
      <Typography variant='body2' color="text.secondary">
        &copy; {new Date().getFullYear()} MediGuid NYC. All rights reseverved.
      </Typography>
      <Typography variant='body2' color="text.secondary" sx={{ mt: 1}}>
        Disclaimer: This tool provides general health information and is not a subtitute for professional medical advice, diagnosis, or treatment. Always seek advice of a qualified health provider for any questions regarding a medical condition.
      </Typography>
      <Box sx={{ mt: 1}}>
        <Link href="#" color="inherit" sx={{ mx: 1}}>Privacy Policy</Link>
        <Link href="#" color="inherit" sx={{ mx: 1}}>Terms of Serivce</Link>
      </Box>
    </Box>
  );
}

export default Footer;