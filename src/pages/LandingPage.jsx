import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  IconButton,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function LandingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background images for the slideshow
  const slides = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop', // Team working
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&h=1080&fit=crop', // Office collaboration
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop', // Business meeting
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const features = [
    {
      icon: <WorkOutlineIcon sx={{ fontSize: 40 }} />,
      title: 'Track Applications',
      description: 'Keep all your job applications organized in one place',
      color: '#1976d2'
    },
    {
      icon: <TrackChangesIcon sx={{ fontSize: 40 }} />,
      title: 'Status Updates',
      description: 'Monitor your application progress from applied to offer',
      color: '#9c27b0'
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 40 }} />,
      title: 'Statistics Dashboard',
      description: 'Visualize your job search progress with real-time stats',
      color: '#2e7d32'
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: 'Search & Filter',
      description: 'Quickly find applications by company, status, or keywords',
      color: '#ed6c02'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure & Private',
      description: 'Your data is protected with JWT authentication',
      color: '#d32f2f'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Fast & Responsive',
      description: 'Lightning-fast performance on all devices',
      color: '#0288d1'
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Full-Screen Hero Section with Background Slideshow */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background Images */}
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 0,
            }}
          />
        ))}

        {/* Dark Overlay for better text readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          }}
        />

        {/* Content on top of background */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 12 }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '4rem' },
                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              }}
            >
              Track Your Job Applications
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 5,
                opacity: 0.95,
                maxWidth: '800px',
                mx: 'auto',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
              }}
            >
              Stay organized, never miss an opportunity, and land your dream job faster
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  bgcolor: '#667eea',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  px: 5,
                  py: 2,
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.5)',
                  '&:hover': {
                    bgcolor: '#5568d3',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 30px rgba(102, 126, 234, 0.7)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  px: 5,
                  py: 2,
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderWidth: 2,
                  },
                }}
              >
                Sign In
              </Button>
            </Stack>

            {/* Slide Navigation Dots */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 8 }}>
              {slides.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => goToSlide(index)}
                  sx={{
                    width: currentSlide === index ? 40 : 12,
                    height: 12,
                    bgcolor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.4)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'white',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>

        {/* Navigation Arrows */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.3)',
            color: 'white',
            zIndex: 3,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.3)',
            color: 'white',
            zIndex: 3,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
          }}
        >
          <ChevronRightIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#f5f7fa', py: 12 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ mb: 8, fontWeight: 600, color: '#2c3e50' }}
          >
            Everything You Need to Manage Your Job Search
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box sx={{ color: feature.color, mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Ready to Get Organized?
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, opacity: 0.95, lineHeight: 1.6 }}>
            Join thousands of job seekers who track their applications with our free platform
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              bgcolor: 'white',
              color: '#667eea',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              px: 6,
              py: 2,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s',
            }}
          >
            Create Free Account
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#2c3e50', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
            © 2025 Job Application Tracker. Built with React & Django. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
