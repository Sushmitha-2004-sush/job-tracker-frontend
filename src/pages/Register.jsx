import { useState, useContext, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Avatar from '@mui/material/Avatar';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    mobile_number: ''
  });
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const { Register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
  // If already logged in, redirect to dashboard
  if (user) {
    navigate('/dashboard');
  }
}, [user, navigate]);

  // Validation functions
  const validateName = (name, fieldName) => {
    if (!name) return ''; // Optional fields
    
    // Check for only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      return `${fieldName} should only contain letters and spaces`;
    }
    
    // Check length
    if (name.length < 2) {
      return `${fieldName} must be at least 2 characters`;
    }
    
    if (name.length > 50) {
      return `${fieldName} must not exceed 50 characters`;
    }
    
    return '';
  };

  const validateUsername = (username) => {
    if (!username) return 'Username is required';
    
    // Username: letters, numbers, underscores, hyphens only
    const usernameRegex = /^[A-Za-z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
      return 'Username can only contain letters, numbers, underscores, and hyphens';
    }
    
    if (username.length < 3) {
      return 'Username must be at least 3 characters';
    }
    
    if (username.length > 20) {
      return 'Username must not exceed 20 characters';
    }
    
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    
    // Check for at least one number
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    
    return '';
  };

  const validateMobile = (mobile) => {
      if (!mobile) return ''; // Optional field
      
      // Remove spaces, hyphens, +91
      const cleanMobile = mobile.replace(/[\s\-+]/g, '');
      const mobileWithoutCode = cleanMobile.replace(/^91/, '');
      
      // Indian mobile: 10 digits starting with 6-9
      const indianMobileRegex = /^[6-9]\d{9}$/;
      
      if (!indianMobileRegex.test(mobileWithoutCode)) {
        return 'Enter a valid 10-digit Indian mobile number (e.g., 9876543210)';
      }
      
      return '';
    };


  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Real-time validation
    let error = '';
    switch(name) {
      case 'first_name':
        error = validateName(value, 'First name');
        break;
      case 'last_name':
        error = validateName(value, 'Last name');
        break;
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'mobile_number':
        error = validateMobile(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'password2':
        error = value !== formData.password ? "Passwords don't match" : '';
        break;
      default:
        break;
    }
    
    setValidationErrors({
      ...validationErrors,
      [name]: error
    });
    
    // Clear backend errors for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newValidationErrors = {
      first_name: validateName(formData.first_name, 'First name'),
      last_name: validateName(formData.last_name, 'Last name'),
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      password2: formData.password !== formData.password2 ? "Passwords don't match" : '',
      mobile_number: validateMobile(formData.mobile_number)
    };
    
    setValidationErrors(newValidationErrors);
    
    // Check if there are any validation errors
    const hasErrors = Object.values(newValidationErrors).some(error => error !== '');
    if (hasErrors) {
      return;
    }
    
    setErrors({});
    setLoading(true);

    const result = await Register(formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setErrors(result.error);
    }
    
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PersonAddOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
          </Box>

          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Registration successful! Redirecting to login...
            </Alert>
          )}

          {errors.non_field_errors && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.non_field_errors[0]}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="first_name"
                  fullWidth
                  label="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  error={!!validationErrors.first_name || !!errors.first_name}
                  helperText={validationErrors.first_name || errors.first_name?.[0] || 'Optional'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="last_name"
                  fullWidth
                  label="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  error={!!validationErrors.last_name || !!errors.last_name}
                  helperText={validationErrors.last_name || errors.last_name?.[0] || 'Optional'}
                />
              </Grid>
              {/* <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    error={!!validationErrors.mobile_number || !!errors.mobile_number}
                    helperText={
                      validationErrors.mobile_number || 
                      errors.mobile_number?.[0] || 
                      'Optional: 10-digit Indian number (e.g., 9876543210)'
                    }
                    placeholder="9876543210"
                  />
                </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={!!validationErrors.username || !!errors.username}
                  helperText={
                    validationErrors.username || 
                    errors.username?.[0] || 
                    'Letters, numbers, underscores, and hyphens only'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!validationErrors.email || !!errors.email}
                  helperText={validationErrors.email || errors.email?.[0]}
                />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mobile Number (Optional)"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    error={!!validationErrors.mobile_number || !!errors.mobile_number}
                    helperText={
                      validationErrors.mobile_number || 
                      errors.mobile_number?.[0] || 
                      'Indian mobile number: 10 digits starting with 6-9'
                    }
                    placeholder="9876543210"
                  />
                </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!validationErrors.password || !!errors.password}
                  helperText={
                    validationErrors.password || 
                    errors.password?.[0] || 
                    'Min 8 chars, 1 uppercase, 1 lowercase, 1 number'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password2}
                  onChange={handleChange}
                  error={!!validationErrors.password2 || !!errors.password2}
                  helperText={validationErrors.password2 || errors.password2?.[0]}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Already have an account? Sign In
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;
