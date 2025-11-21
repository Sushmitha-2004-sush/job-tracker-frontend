import { useState, useContext, useEffect } from 'react';
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
  InputAdornment,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CodeIcon from '@mui/icons-material/Code';
import ComputerIcon from '@mui/icons-material/Computer';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import DevicesIcon from '@mui/icons-material/Devices';
import TerminalIcon from '@mui/icons-material/Terminal';
import BugReportIcon from '@mui/icons-material/BugReport';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  // Floating icons configuration
  const floatingIcons = [
    { Icon: CodeIcon, top: '15%', left: '10%', delay: 0, color: '#FFD700' },
    { Icon: ComputerIcon, top: '25%', right: '12%', delay: 1, color: '#FF6B6B' },
    { Icon: CloudIcon, top: '60%', left: '8%', delay: 2, color: '#4ECDC4' },
    { Icon: StorageIcon, top: '75%', right: '15%', delay: 0.5, color: '#95E1D3' },
    { Icon: DevicesIcon, top: '40%', left: '5%', delay: 1.5, color: '#FFA07A' },
    { Icon: TerminalIcon, top: '50%', right: '8%', delay: 2.5, color: '#DDA0DD' },
    { Icon: BugReportIcon, top: '85%', left: '12%', delay: 1, color: '#F38181' },
    { Icon: RocketLaunchIcon, top: '10%', right: '18%', delay: 2, color: '#AA96DA' },
  ];

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Floating IT Icons */}
      {floatingIcons.map((item, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: item.top,
            left: item.left,
            right: item.right,
            animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
            opacity: 0.2,
            '@keyframes float': {
              '0%, 100%': {
                transform: 'translateY(0px) rotate(0deg)',
              },
              '50%': {
                transform: 'translateY(-20px) rotate(5deg)',
              },
            },
          }}
        >
          <item.Icon sx={{ fontSize: { xs: 40, md: 60 }, color: item.color }} />
        </Box>
      ))}

      {/* Decorative Circles */}
      <Box
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          top: '-100px',
          left: '-100px',
          animation: 'pulse 4s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          bottom: '-80px',
          right: '-80px',
          animation: 'pulse 5s ease-in-out infinite',
        }}
      />

      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: 'white',
          zIndex: 10,
          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
        }}
      >
        Back to Home
      </Button>

      <Container component="main" maxWidth="xs" sx={{ zIndex: 5 }}>
        <Paper
          elevation={24}
          sx={{
            padding: 3,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Box
              sx={{
                width: 55,
                height: 55,
                bgcolor: 'primary.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 1.5,
                boxShadow: '0 4px 20px rgba(25, 118, 210, 0.4)',
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '1.5rem' }}
            >
              Welcome Back!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              Sign in to continue to your dashboard
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 1.5,
                borderRadius: 2,
                fontSize: '0.875rem',
                py: 0.5,
                animation: 'shake 0.5s',
                '@keyframes shake': {
                  '0%, 100%': { transform: 'translateX(0)' },
                  '25%': { transform: 'translateX(-10px)' },
                  '75%': { transform: 'translateX(10px)' },
                },
              }}
            >
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 1.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 0.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />

            {/* Remember Me */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="body2" sx={{ fontSize: '0.813rem' }}>Remember me</Typography>}
              />
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  fontSize: '0.813rem',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                mb: 1.5,
                py: 1.1,
                fontSize: '0.95rem',
                fontWeight: 'bold',
                borderRadius: 2,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #66398f 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                },
                transition: 'all 0.3s',
              }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: 'white' }} />
              ) : (
                'Sign In'
              )}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 1.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                OR
              </Typography>
            </Divider>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                Don't have an account?{' '}
                <Link
                  to="/register"
                  style={{
                    textDecoration: 'none',
                    color: '#667eea',
                    fontWeight: 'bold',
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Footer Text */}
        <Typography
          variant="caption"
          align="center"
          sx={{
            mt: 1.5,
            color: 'white',
            opacity: 0.8,
            display: 'block',
            fontSize: '0.7rem',
          }}
        >
          © 2025 Job Application Tracker
        </Typography>
      </Container>
    </Box>
  );
}

export default Login;
