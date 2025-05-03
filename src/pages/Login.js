import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from './components/SnackbarAlert';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import AuthBox from './components/AuthBox';
import { ThemeContext } from '../context/ThemeContext';
import LoginIcon from '@mui/icons-material/Login';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CodeIcon from '@mui/icons-material/Code';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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
    <AuthBox>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 500 }}>
        <Stack spacing={3}>
          <Typography variant="h4" align="center" fontWeight="bold">
            <LoginIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Sign In
          </Typography>

          <Typography variant="body1" align="center" color="text.secondary">
            Build your dynamic portfolio with modular case studies — whether you're a
            <DesignServicesIcon fontSize="small" sx={{ mx: 0.5, verticalAlign: 'middle' }} /> designer,
            <CodeIcon fontSize="small" sx={{ mx: 0.5, verticalAlign: 'middle' }} /> developer, or
            <MenuBookIcon fontSize="small" sx={{ mx: 0.5, verticalAlign: 'middle' }} /> writer.
          </Typography>

          <Divider />

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField fullWidth label="Username" name="username" onChange={handleChange} />
              <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} />
              <Button fullWidth variant="contained" type="submit" size="large">Login</Button>
            </Stack>
          </form>

          <Box textAlign="center">
            <Typography variant="body2">
              Don’t have an account?{' '}
              <Link component={RouterLink} to="/register" underline="hover">
                Register
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <SnackbarAlert {...snack} onClose={() => setSnack({ ...snack, open: false })} />
    </AuthBox>
  );
}
