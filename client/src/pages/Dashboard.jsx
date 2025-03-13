import React from 'react';
import { Box, Typography, Grid, Card, CardContent, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TrendingUp, Group, FitnessCenter, LocalHospital } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
    background: 'rgba(255, 255, 255, 0.98)',
  },
}));

const GradientBackground = styled(Box)({
  background: 'linear-gradient(135deg, #0A2342 0%, #283593 100%)',
  backgroundImage: `
    linear-gradient(135deg, #0A2342 0%, #283593 100%),
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E")
  `,
  minHeight: '100vh',
  padding: '32px',
  position: 'relative',
});

const MetricCard = ({ title, value, icon, progress }) => (
  <Grid item xs={12} sm={6} md={3}>
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Box
            sx={{
              backgroundColor: 'primary.main',
              borderRadius: '12px',
              p: 1,
              color: 'white',
              display: 'flex',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div" ml={2} fontWeight="500">
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="h3" 
          component="div" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(0,0,0,0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
            }
          }}
        />
      </CardContent>
    </StyledCard>
  </Grid>
);

function Dashboard() {
  const metrics = [
    { title: 'Active Athletes', value: '24', icon: <Group fontSize="large" />, progress: 75 },
    { title: 'Performance Score', value: '92%', icon: <TrendingUp fontSize="large" />, progress: 92 },
    { title: 'Training Plans', value: '15', icon: <FitnessCenter fontSize="large" />, progress: 60 },
    { title: 'Injury Reports', value: '3', icon: <LocalHospital fontSize="large" />, progress: 30 },
  ];

  return (
    <GradientBackground>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          mb: 6,
          textAlign: 'center',
          letterSpacing: '0.5px',
        }}
      >
        Athlete Management Dashboard
      </Typography>
      <Grid container spacing={4}>
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </Grid>
    </GradientBackground>
  );
}

export default Dashboard;