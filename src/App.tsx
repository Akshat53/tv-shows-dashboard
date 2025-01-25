// App.tsx
import React, { useState } from 'react';
import { Box, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightPane from './components/RightPane';
import { Show } from './types';

// Update the theme in App.tsx

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#eff6ff',
      dark: '#1e40af',
    },
    success: {
      main: '#059669',
      light: '#ecfdf5',
      dark: '#047857',
    },
    warning: {
      main: '#f59e0b',
      light: '#fef3c7',
      dark: '#d97706',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.06)',
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "Segoe UI", "Roboto", sans-serif',
    h5: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '12px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar 
          mobileOpen={mobileOpen} 
          handleDrawerToggle={handleDrawerToggle} 
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { lg: `calc(100% - ${selectedShow ? 560 : 240}px)` },
            ml: { lg: `${240}px` },
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <MainContent 
            onShowSelect={setSelectedShow}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Box>
        <RightPane 
          selectedShow={selectedShow}
          onClose={() => setSelectedShow(null)}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;