import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Timeline as TimelineIcon,
  LocalHospital as InjuryIcon,
  FitnessCenter as TrainingIcon,
  AttachMoney as FinanceIcon,
  TrendingUp as CareerIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Athletes', path: '/athletes', icon: <PersonIcon /> },
  { text: 'Performance', path: '/performance', icon: <TimelineIcon /> },
  { text: 'Career Prediction', path: '/career', icon: <CareerIcon /> },
  { text: 'Injuries', path: '/injuries', icon: <InjuryIcon /> },
  { text: 'Training', path: '/training', icon: <TrainingIcon /> },
  { text: 'Finance', path: '/finance', icon: <FinanceIcon /> },
];

function Navigation() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text}>
            <Link
              component={RouterLink}
              to={item.path}
              underline="none"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Navigation;