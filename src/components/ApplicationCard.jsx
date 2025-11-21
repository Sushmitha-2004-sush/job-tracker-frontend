import { Card, CardContent, Typography, Chip, IconButton, Box, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function ApplicationCard({ application, onEdit, onDelete }) {
  const statusColors = {
    applied: 'primary',
    interview_scheduled: 'warning',
    technical_round: 'info',
    hr_round: 'secondary',
    offer_received: 'success',
    rejected: 'error'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card sx={{ mb: 2, '&:hover': { boxShadow: 6 } }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {application.job_title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <BusinessIcon fontSize="small" color="action" />
              <Typography variant="body1" color="text.secondary">
                {application.company_name}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton size="small" color="primary" onClick={() => onEdit(application)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => onDelete(application.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          {application.location && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {application.location}
                </Typography>
              </Box>
            </Grid>
          )}
          {application.salary_range && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AttachMoneyIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {application.salary_range}
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Applied: {formatDate(application.application_date)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={application.status.replace(/_/g, ' ').toUpperCase()} 
            color={statusColors[application.status]} 
            size="small"
          />
        </Box>

        {application.notes && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
            Note: {application.notes}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default ApplicationCard;
