import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

function StatisticsCards({ stats }) {
  const cards = [
    {
      title: 'Total Applications',
      value: stats.total || 0,
      icon: <WorkOutlineIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      bgColor: '#e3f2fd'
    },
    {
      title: 'Applied',
      value: stats.applied || 0,
      icon: <ScheduleIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
      bgColor: '#fff4e6'
    },
    {
      title: 'Interviews',
      value: (stats.interview_scheduled || 0) + (stats.technical_round || 0) + (stats.hr_round || 0),
      icon: <ScheduleIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      bgColor: '#f3e5f5'
    },
    {
      title: 'Offers',
      value: stats.offer_received || 0,
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
      bgColor: '#e8f5e9'
    },
    {
      title: 'Rejected',
      value: stats.rejected || 0,
      icon: <CancelOutlinedIcon sx={{ fontSize: 40 }} />,
      color: '#d32f2f',
      bgColor: '#ffebee'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={2.4} key={index}>
          <Card sx={{ height: '100%', bgcolor: card.bgColor }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography color="text.secondary" variant="caption" sx={{ fontWeight: 'bold' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h4" sx={{ color: card.color, fontWeight: 'bold', mt: 1 }}>
                    {card.value}
                  </Typography>
                </Box>
                <Box sx={{ color: card.color }}>
                  {card.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default StatisticsCards;
