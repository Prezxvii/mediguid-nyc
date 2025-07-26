// src/components/CustomSearchBar.js
import React, { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function CustomSearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClearClick = () => {
    setQuery('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 600,
        borderRadius: '50px',
        boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        background: 'white',
        backdropFilter: 'blur(5px)',
        // ADD THIS LINE TO CENTER THE COMPONENT:
        mx: 'auto', // mx is shorthand for marginLeft and marginRight
      }}
      elevation={0}
    >
      <IconButton sx={{ p: '10px', color: 'text.secondary' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, color: 'text.primary' }}
        placeholder="What are you looking for? (e.g., 'cough', 'fatigue')"
        inputProps={{ 'aria-label': 'search medical conditions' }}
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      {query && (
        <IconButton
          sx={{ p: '10px', color: 'text.secondary' }}
          aria-label="clear"
          onClick={handleClearClick}
        >
          <ClearIcon />
        </IconButton>
      )}
    </Paper>
  );
}

export default CustomSearchBar;