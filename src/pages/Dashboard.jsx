import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CodeIcon from '@mui/icons-material/Code';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StatisticsCards from '../components/StatisticsCards';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationDialog from '../components/ApplicationDialog';
import {
  getApplications,
  getStatistics,
  createApplication,
  updateApplication,
  deleteApplication
} from '../services/applicationService';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [applications, setApplications] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Floating icons configuration
  const floatingIcons = [
    { Icon: CodeIcon, top: '5%', left: '3%', delay: 0, color: '#667eea', size: 40 },
    { Icon: BusinessCenterIcon, top: '15%', right: '5%', delay: 1, color: '#f093fb', size: 35 },
    { Icon: TrendingUpIcon, top: '45%', left: '2%', delay: 2, color: '#4facfe', size: 45 },
    { Icon: EmojiEventsIcon, top: '70%', right: '4%', delay: 0.5, color: '#43e97b', size: 38 },
    { Icon: SchoolIcon, top: '30%', right: '8%', delay: 1.5, color: '#fa709a', size: 42 },
    { Icon: GroupsIcon, top: '60%', left: '5%', delay: 2.5, color: '#30cfd0', size: 40 },
    { Icon: LightbulbIcon, top: '85%', left: '8%', delay: 1, color: '#ffd89b', size: 36 },
    { Icon: RocketLaunchIcon, top: '10%', left: '50%', delay: 2, color: '#a18cd1', size: 50 },
  ];

  useEffect(() => {
    fetchData();
  }, [statusFilter, searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    const filters = {};
    if (statusFilter) filters.status = statusFilter;
    if (searchTerm) filters.search = searchTerm;
    
    const [appsResult, statsResult] = await Promise.all([
      getApplications(filters),
      getStatistics()
    ]);
    
    if (appsResult.success) setApplications(appsResult.data);
    if (statsResult.success) setStatistics(statsResult.data);
    
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddClick = () => {
    setSelectedApplication(null);
    setDialogOpen(true);
  };

  const handleEditClick = (application) => {
    setSelectedApplication(application);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedApplication(null);
  };

  const handleSave = async (formData) => {
    setSaveLoading(true);
    setError('');
    setSuccess('');
    
    let result;
    if (selectedApplication) {
      result = await updateApplication(selectedApplication.id, formData);
    } else {
      result = await createApplication(formData);
    }
    
    if (result.success) {
      setSuccess(selectedApplication ? 'Application updated successfully!' : 'Application added successfully!');
      handleDialogClose();
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.error);
    }
    
    setSaveLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      const result = await deleteApplication(id);
      if (result.success) {
        setSuccess('Application deleted successfully!');
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to delete application');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating Background Icons */}
      {floatingIcons.map((item, index) => (
        <Box
          key={index}
          sx={{
            position: 'fixed',
            top: item.top,
            left: item.left,
            right: item.right,
            animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
            opacity: 0.50,
            zIndex: 0,
            '@keyframes float': {
              '0%, 100%': {
                transform: 'translateY(0px) rotate(0deg)',
              },
              '50%': {
                transform: 'translateY(-25px) rotate(10deg)',
              },
            },
          }}
        >
          <item.Icon sx={{ fontSize: item.size, color: item.color }} />
        </Box>
      ))}

      {/* Decorative Shapes */}
      <Box
        sx={{
          position: 'fixed',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
          top: '-150px',
          right: '-150px',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(156, 39, 176, 0.1) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-100px',
          zIndex: 0,
        }}
      />

      {/* AppBar */}
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          zIndex: 1000,
        }}
      >
        <Toolbar>
          <WorkOutlineIcon sx={{ mr: 2, fontSize: 28 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Job Application Tracker
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mr: 3,
              px: 2,
              py: 0.5,
              bgcolor: 'rgba(255,255,255,0.2)',
              borderRadius: 2,
              fontWeight: 500,
            }}
          >
            👋 {user?.username}
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s',
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative', zIndex: 1 }}>
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(211, 47, 47, 0.2)',
            }}
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            severity="success"
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(46, 125, 50, 0.2)',
            }}
          >
            {success}
          </Alert>
        )}

        <StatisticsCards stats={statistics} />

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: '#2c3e50' }}>
              My Applications
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 'bold',
                px: 3,
                py: 1,
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #66398f 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                },
                transition: 'all 0.3s',
              }}
            >
              Add Application
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              select
              label="Filter by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{
                minWidth: 200,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
              size="small"
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="applied">Applied</MenuItem>
              <MenuItem value="interview_scheduled">Interview Scheduled</MenuItem>
              <MenuItem value="technical_round">Technical Round</MenuItem>
              <MenuItem value="hr_round">HR Round</MenuItem>
              <MenuItem value="offer_received">Offer Received</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </TextField>
            <TextField
              label="Search Company or Position"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{
                flexGrow: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : applications.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <WorkOutlineIcon sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No applications found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                Click "Add Application" to track your first job application
              </Typography>
            </Box>
          ) : (
            applications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
            ))
          )}
        </Paper>
      </Container>

      <ApplicationDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSave={handleSave}
        application={selectedApplication}
        loading={saveLoading}
      />
    </Box>
  );
}

export default Dashboard;
