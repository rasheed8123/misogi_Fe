import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Paper,
  Link,
  Divider,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SnackbarAlert from './components/SnackbarAlert';
import { ThemeContext } from '../context/ThemeContext';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setThemeName } = useContext(ThemeContext);

  useEffect(() => {
    setThemeName('light');
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      return setSnack({ open: true, message: 'Both fields are required', severity: 'warning' });
    }

    try {
      await login(form);
      setSnack({ open: true, message: 'Login successful!', severity: 'success' });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setSnack({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ display: 'flex', borderRadius: 3, overflow: 'hidden', width: '90%', maxWidth: 1000 }}>
        {/* Left side (form) */}
        <Box sx={{ flex: 1, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box mb={2} sx={{ textAlign: 'center' }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQynY1SigB7a3ob3Etoi4EARhILzxyws6GrQ&s" alt="Logo" style={{ maxHeight: 50 }} />
          </Box>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Username" name="username" fullWidth onChange={handleChange} />
              <TextField label="Password" name="password" type="password" fullWidth onChange={handleChange} />
              {/* <FormControlLabel control={<Checkbox />} label="Remember Me" /> */}
              <Button type="submit" variant="contained" fullWidth>Login</Button>
              {/* <Link component={RouterLink} to="/forgot-password" underline="hover" textAlign="right">
                Forgot Password?
              </Link> */}
            </Stack>
          </form>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" align="center">
            Don’t have an account?{' '}
            <Link component={RouterLink} to="/register" underline="hover">Register</Link>
          </Typography>
          <Typography variant="caption" align="center" display="block" sx={{ mt: 2 }}>
            By signing up, you agree to our{' '}
            <Link href="#" underline="hover">Terms and Conditions</Link> &{' '}
            <Link href="#" underline="hover">Privacy Policy</Link>
          </Typography>
        </Box>

        {/* Right side (illustration) */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(https://i.pinimg.com/736x/5a/2c/3b/5a2c3b5244964acbaa8c35bc2509763f.jpg)`, // replace with your actual image path
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', md: 'block' }
          }}
        />
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
