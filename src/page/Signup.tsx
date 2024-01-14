import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const defaultTheme = createTheme();

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;


const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [formDataValue, setFormDataValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const navigate = useNavigate();

  useEffect(() => {
    const authenticated = localStorage.getItem("Authenticated");
    if(authenticated){
      navigate('/login');
    }
  },[])

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
  
    if (name === 'email' || name === "password" || name === "confirmPassword") {
      setFormDataValue({
        ...formDataValue,
        [name]: value,
      });
    }
  }
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handlesubmit")
    console.log(formDataValue.email,formDataValue.password, "confirmPassword",formDataValue.confirmPassword)
    if (formDataValue.email && formDataValue.password && formDataValue.confirmPassword) {
      if (formDataValue.password === formDataValue.confirmPassword) {
        const emailValidation = emailRegex.test(formDataValue.email);
        const passwordValidation = passwordRegex.test(formDataValue.password);
        console.log(emailValidation,passwordValidation);
        if (emailValidation && passwordValidation) {
          // Store user credentials in localStorage
          localStorage.setItem("userCredentials", JSON.stringify(formDataValue));
    
          // Show a toast for successful signup
          toast.info('Credentials saved. Redirecting to login page...');
    
          // Redirect to login page after successful signup
          navigate('/login');
        } else {
          // toast.error(`Invalid ${}  `)
          console.log("Invalid email or password format");
        }
      } else {
        toast.error('Passwords do not match');
      }
    } else {
      toast.error('Please fill in all fields');
    }
    
    }
  





  // // Validate passwords match
  // if (password !== confirmPassword) {
  //   toast.error('Passwords do not match');
  //   return;



// function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
//   throw new Error('Function not implemented.');
// }

return (
  <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handleChange}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                onChange={handleChange}
                type={showConfirmPassword ? 'text' : 'password'}
                id="Cpassword"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowConfirmPassword}>
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  </ThemeProvider>
);
};

export default SignUp;
