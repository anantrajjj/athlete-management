import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TrendingUp, Group, FitnessCenter, LocalHospital } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s ease-in-out',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const GradientBackground = styled(Box)({
  background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
  minHeight: '100vh',
  padding: '24px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    opacity: 0.1,
  },
});

const MetricCard = ({ title, value, icon, progress }) => (
  <Grid item xs={12} sm={6} md={3}>
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {icon}
          <Typography variant="h6" component="div" ml={1}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" component="div" gutterBottom>
          {value}
        </Typography>
        <LinearProgress variant="determinate" value={progress} />
      </CardContent>
    </StyledCard>
  </Grid>
);

function Dashboard() {
  const metrics = [
    { title: 'Active Athletes', value: '24', icon: <Group fontSize="large" color="primary" />, progress: 75 },
    { title: 'Performance Score', value: '92%', icon: <TrendingUp fontSize="large" color="primary" />, progress: 92 },
    { title: 'Training Plans', value: '15', icon: <FitnessCenter fontSize="large" color="primary" />, progress: 60 },
    { title: 'Injury Reports', value: '3', icon: <LocalHospital fontSize="large" color="primary" />, progress: 30 },
  ];

  return (
    <GradientBackground>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          mb: 4,
        }}
      >
        Athlete Management Dashboard
      </Typography>
      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </Grid>
    </GradientBackground>
  );
}

export default Dashboard;