import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Paper,
  Link,
  Divider
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SnackbarAlert from './components/SnackbarAlert';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      return setSnack({ open: true, message: 'All fields are required', severity: 'warning' });
    }

    try {
      await register(form);
      setSnack({ open: true, message: 'Registered successfully!', severity: 'success' });
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setSnack({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ display: 'flex', borderRadius: 3, overflow: 'hidden', width: '90%', maxWidth: 1000 }}>
        {/* Left side (form) */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRro-seGxbP9T0RErJcC3GwXOYyykFdKGB8NA&s)`, // Replace with your image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', md: 'block' }
          }}
        />
        <Box sx={{ flex: 1, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box mb={2} sx={{ textAlign: 'center' }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQynY1SigB7a3ob3Etoi4EARhILzxyws6GrQ&s" alt="Logo" style={{ maxHeight: 50 }} />
          </Box>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Create Your Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Email" name="username" fullWidth onChange={handleChange} />
              <TextField label="Password" name="password" type="password" fullWidth onChange={handleChange} />
              <Button type="submit" variant="contained" fullWidth>
                Register
              </Button>
            </Stack>
          </form>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" underline="hover">Log in</Link>
          </Typography>
          <Typography variant="caption" align="center" display="block" sx={{ mt: 2 }}>
            By registering, you agree to our{' '}
            <Link href="#" underline="hover">Terms</Link> &{' '}
            <Link href="#" underline="hover">Privacy Policy</Link>.
          </Typography>
        </Box>

        {/* Right side (illustration) */}
        
      </Paper>

      {/* Footer */}
      <Box position="absolute" bottom={16} textAlign="center" width="100%">
        <Typography variant="caption">
          Powered by <strong style={{ color: '#f68b1f' }}>Rasheed</strong>{' '}
          <strong style={{ color: '#0046be' }}>Ahmed</strong> &copy; All rights reserved
        </Typography>
      </Box>

      <SnackbarAlert {...snack} onClose={() => setSnack({ ...snack, open: false })} />
    </Box>
  );
}
