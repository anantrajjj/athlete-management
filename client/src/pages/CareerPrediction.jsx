import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  Star,
  Timeline,
  FitnessCenter,
  LocalHospital,
  EmojiEvents,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
  },
}));

const CircularProgressWithLabel = ({ value }) => (
  <Box position="relative" display="inline-flex">
    <CircularProgress
      variant="determinate"
      value={value}
      size={120}
      thickness={4}
      sx={{
        color: value >= 85 ? '#4caf50' : value >= 70 ? '#2196f3' : value >= 50 ? '#ff9800' : '#f44336',
      }}
    />
    <Box
      top={0}
      left={0}
      bottom={0}
      right={0}
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" component="div" color="text.secondary">
        {value}
      </Typography>
    </Box>
  </Box>
);

function CareerPrediction() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual athlete ID
    const athleteId = 1;
    fetch(`http://localhost:3000/api/athletes/${athleteId}/career-prediction`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setPrediction(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch career prediction');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Career Prediction Analysis
      </Typography>
      
      <Grid container spacing={4}>
        {/* Potential Score Card */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" gutterBottom>
                Career Potential Score
              </Typography>
              <CircularProgressWithLabel value={prediction.potential_score} />
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Career Paths Card */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Recommended Career Paths
              </Typography>
              <List>
                {prediction.career_paths.map((path, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <EmojiEvents color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={path} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Performance Factors */}
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Performance Factors
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <Timeline color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">Performance Level</Typography>
                    <Typography variant="h4" color="primary">
                      {prediction.factors.performance_level}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <Star color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">Consistency</Typography>
                    <Typography variant="h4" color="primary">
                      {prediction.factors.consistency}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <FitnessCenter color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">Training Score</Typography>
                    <Typography variant="h4" color="primary">
                      {prediction.factors.training_dedication}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <LocalHospital color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">Injury Risk</Typography>
                    <Typography variant="h4" color="primary">
                      {prediction.factors.injury_risk}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CareerPrediction;
