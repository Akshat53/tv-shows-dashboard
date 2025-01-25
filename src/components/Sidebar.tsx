// components/Sidebar.tsx
import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Tv as TvIcon,
  Movie as MovieIcon,
  Theaters as TheatersIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

interface MenuItem {
  text: string;
  icon: JSX.Element;
  active?: boolean;
}

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: '4px 8px',
  padding: '10px 12px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '20',
  },
  '&.active': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const drawerWidth = 240;

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'TV Shows', icon: <TvIcon />, active: true },
  { text: 'Movies', icon: <MovieIcon /> },
  { text: 'Series', icon: <TheatersIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo/Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TvIcon sx={{ color: 'white', fontSize: 20 }} />
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            fontSize: '1.2rem',
          }}
        >
          TV Dashboard
        </Typography>
      </Box>

      {/* Navigation List */}
      <List sx={{ flex: 1, px: 1, py: 2 }}>
        {menuItems.map((item) => (
          <StyledListItemButton
            key={item.text}
            className={item.active ? 'active' : ''}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: item.active ? 600 : 500,
              }}
            />
          </StyledListItemButton>
        ))}
      </List>

      {/* Help Section */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'rgba(37, 99, 235, 0.05)',
          }}
        >
          <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
            Need Help?
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 2, fontSize: '0.8rem' }}
          >
            Check our documentation
          </Typography>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: 1,
              bgcolor: 'rgba(37, 99, 235, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(37, 99, 235, 0.15)',
              },
            }}
          >
            <SettingsIcon 
              sx={{ 
                color: theme.palette.primary.main,
                fontSize: 16,
              }} 
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: drawerWidth },
        flexShrink: { lg: 0 },
      }}
    >
      {isDesktop ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              border: 'none',
              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.05)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;