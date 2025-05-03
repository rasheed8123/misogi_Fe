import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        It might have been moved or deleted.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Go Home
      </Button>
    </Container>
  );
}
