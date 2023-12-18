import { useState } from 'react';
import { Button, TextField, Typography, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../apis/auth';
import toast from 'react-hot-toast';
import { useMyContext } from '../context';

const Login = () => {
  const { setIsAuthenticated } = useMyContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement login logic here
    const response = await signIn({ email, password });
    if (response?.detail) {
      toast.error(response.detail);
    } else if (response?.user) {
      setIsAuthenticated(true);
      toast.success("success");
      navigate('/');
    }
  };

  const handleRegisterNavigate = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ marginTop: 8, padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login to your account
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Button
            onClick={handleRegisterNavigate}
            fullWidth
            variant="text"
            sx={{ mt: 2 }}
          >
            Don't have an account? Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
