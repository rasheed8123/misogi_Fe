import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from './components/SnackbarAlert';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import AuthBox from './components/AuthBox';

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
    <AuthBox>
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Username" name="username" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password" onChange={handleChange} />
        <Button variant="contained" type="submit">Register</Button>
      </form>  
      <Box textAlign="center" mt={2}>
       <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Log in
            </Link>
        </Typography>
      </Box>

      <SnackbarAlert {...snack} onClose={() => setSnack({ ...snack, open: false })} />
    </Container>
    </AuthBox>
  );
}
