// src/components/ChatWidget.js
import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, TextField, IconButton, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

// Helper function to render formatted AI text within the chat bubble
// Removed direct <p> and <strong> tags and opted for Typography component for consistency
const renderChatFormattedText = (text) => {
  if (!text) return null;

  // Split text by lines, then process each line for bolding and potential list items
  return text.split('\n').map((line, lineIndex) => {
    line = line.trim();
    if (!line) return null; // Skip empty lines

    // Check if it's a list item (e.g., starts with - or *)
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItemContent = line.substring(2); // Remove list bullet
      return (
        <ListItem key={`${lineIndex}-li`} sx={{ py: 0.5, pl: 2, alignItems: 'flex-start', display: 'list-item', listStyleType: 'disc' }}>
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
        <Typography key={lineIndex} variant="body2" sx={{ mb: 0.5, lineHeight: 1.5 }}>
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


function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // [{ type: 'user' | 'ai', content: string }]
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen((prevIsOpen) => {
      if (!prevIsOpen) { // If chat is about to open
        setMessages([{ type: 'ai', content: "Hello! I'm MediGuid AI. Tell me about your non-emergency symptoms in brief." }]);
      } else { // If chat is about to close
        setMessages([]); // Clear when closing
      }
      setError(null);
      setInputMessage('');
      return !prevIsOpen;
    });
  };


  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = inputMessage.trim();
    setMessages((prevMessages) => [...prevMessages, { type: 'user', content: userMessage }]);
    setInputMessage('');
    setLoading(true);
    setError(null);

    try {
      // API call to your backend's /api/diagnose endpoint
      const apiResponse = await axios.post('http://localhost:5000/api/diagnose', {
        selectedSymptomIds: [], // Send empty array for symptom IDs for chat flow
        chatInput: userMessage // Pass the user's free text input here
      });

      const aiContent = apiResponse.data.aiResponse;

      setMessages((prevMessages) => [...prevMessages, { type: 'ai', content: aiContent }]);

    } catch (err) {
      console.error('Error during chat AI diagnosis:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.error || 'Sorry, I could not get guidance right now. Please try again or rephrase.');
      setMessages((prevMessages) => [...prevMessages, { type: 'ai', content: "I'm sorry, I encountered an error. Please try again or rephrase your question." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputMessage.trim() !== '' && !loading) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <IconButton
        onClick={toggleChat}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          zIndex: 1000,
          boxShadow: 3,
          width: 60,
          height: 60,
        }}
      >
        {isOpen ? <CloseIcon fontSize="large" /> : <ChatBubbleOutlineIcon fontSize="large" />}
      </IconButton>

      {/* Chat Window */}
      {isOpen && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            width: { xs: '90%', sm: 350 },
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            boxShadow: 8,
            zIndex: 999,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">MediGuid AI Chat</Typography>
            <IconButton size="small" onClick={toggleChat} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: 'grey.50' }}>
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  px: 0, py: 0.5
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '80%',
                    bgcolor: msg.type === 'user' ? 'primary.light' : 'white',
                    color: msg.type === 'user' ? 'white' : 'text.primary',
                    borderRadius: '20px',
                    borderBottomLeftRadius: msg.type === 'user' ? '20px' : '2px',
                    borderBottomRightRadius: msg.type === 'user' ? '2px' : '20px',
                    boxShadow: 1,
                    typography: 'body2',
                    lineHeight: 1.5
                  }}
                >
                  {msg.type === 'ai' ? renderChatFormattedText(msg.content) : msg.content}
                </Paper>
              </ListItem>
            ))}
            {loading && (
                <ListItem sx={{ justifyContent: 'flex-start', px: 0, py: 0.5 }}>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">Thinking...</Typography>
                </ListItem>
            )}
            {error && (
                <ListItem sx={{ justifyContent: 'flex-start', px: 0, py: 0.5 }}>
                    <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>
                </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
          <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', bgcolor: 'background.paper' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your symptoms..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              sx={{ mr: 1 }}
              disabled={loading}
            />
            <IconButton color="primary" onClick={handleSendMessage} disabled={loading || inputMessage.trim() === ''}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default ChatWidget;