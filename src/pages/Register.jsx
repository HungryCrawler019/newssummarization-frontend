import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register } from '../apis/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate(); // Hook to navigate

  const { username, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginNavigate = () => {
    navigate('/login'); // Navigate to the register page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch error
      console.error("Passwords don't match");
      toast.error("Passwords don't match");
      return;
    }
    console.log(formData)
    const response = await register(formData);
    if(response){
      handleLoginNavigate();
    }
    // Call the onRegister function passed as a prop with the form data
    // onRegister(username, email, password);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ marginTop: 8, padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
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
            value={email}
            onChange={handleChange}
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
            autoComplete="new-password"
            value={password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Button
            onClick={handleLoginNavigate}
            fullWidth
            variant="text"
            sx={{ mt: 2 }}
          >
            Already have an account? Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
