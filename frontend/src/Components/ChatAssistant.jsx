import React, { useState } from 'react';
import { Fab, Dialog, DialogTitle, DialogContent, TextField, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you with cryptocurrencies today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Thanks for your message! This is a demo response.', sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpen(true)}
      >
        <ChatIcon />
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Chat Assistant</DialogTitle>
        <DialogContent>
          <List sx={{ height: 300, overflow: 'auto' }}>
            {messages.map((msg, index) => (
              <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <ListItemText
                  primary={msg.text}
                  sx={{
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.200',
                    color: msg.sender === 'user' ? 'white' : 'black',
                    borderRadius: 2,
                    p: 1,
                    maxWidth: '70%'
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
              Send
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatAssistant;