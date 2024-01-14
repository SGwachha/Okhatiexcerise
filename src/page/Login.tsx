import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import PasswordConditions from './PasswordConditions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValidFormat = emailRegex.test(email);

  return isValidFormat;
}

function EmailTextField(props: any) {
  const { focused, ...other } = props;
  const isError = !props.valid;

  return (
    <TextField
      {...other}
      error={isError}
      helperText={isError ? 'Invalid email' : ''}
      sx={{
        '& label.Mui-focused': {
          color: focused ? (isError ? 'red' : 'green') : 'gray',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: focused ? (isError ? 'red' : 'green') : 'gray',
        },
      }}
    />
  );
}

const defaultTheme = createTheme();

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formDataValue, setFormDataValue] = useState({
    email: '',
    password: '',
  });

  const [isFocused, setIsFocused] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [passwordConditions, setPasswordConditions] = useState([
    false, // At least 8 characters
    false, // At least one numeric character
    false, // At least one special character
  ]);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const userCredentials = localStorage.getItem('userCredentials');
    const IsAuthenticated = localStorage.getItem('Authenticated');
    if (!userCredentials) {
      navigate('/');
    }
    else if(IsAuthenticated){
      navigate('/authenticated');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setIsValidEmail(validateEmail(value));
    }

    if (name === 'password') {
      validatePassword(value);
    }

    setFormDataValue({
      ...formDataValue,
      [name]: value,
    });
  };

  const validatePassword = (password: string) => {
    setPasswordConditions([
      password.length >= 8,
      /\d/.test(password),
      /[@$!%*?&]/.test(password),
    ]);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (formDataValue.email.trim() !== '' && formDataValue.password.trim() !== '') {
      const storedCredentials = JSON.parse(localStorage.getItem('userCredentials') || 'null');
  
      if (storedCredentials) {
        if (storedCredentials.email === formDataValue.email && storedCredentials.password === formDataValue.password) {
          localStorage.setItem('Authenticated', 'true');
          toast.success('Sign in successful');
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for the toast to be displayed
          navigate('/authenticated');
        } else {
          toast.error('Invalid email or password');
        }
      } else {
        toast.error('User not found. Please sign up.');
      }
    } else {
      toast.error('Please enter both email and password');
    }
  };
  

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <EmailTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              name="email"
              autoComplete="email"
              autoFocus
              focused={isFocused}
              valid={isValidEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <PasswordConditions conditions={passwordConditions} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Login;