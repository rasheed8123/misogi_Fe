import { Box, Paper, Container } from '@mui/material';

const AuthBox = ({ children }) => {
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default AuthBox;
