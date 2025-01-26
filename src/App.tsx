// App.tsx
import React, { useState } from 'react';
import { Box, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightPane from './components/RightPane';
import { Show } from './types';

const DRAWER_WIDTH = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8fafc'
        }
      }
    }
  }
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
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Sidebar - Fixed width */}
        <Box
          component="nav"
          sx={{
            width: { lg: DRAWER_WIDTH },
            flexShrink: { lg: 0 },
          }}
        >
          <Sidebar 
            mobileOpen={mobileOpen} 
            handleDrawerToggle={handleDrawerToggle} 
          />
        </Box>

        {/* Main Content - Takes remaining width */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <MainContent 
            onShowSelect={setSelectedShow}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Box>

        {/* Right Pane - Only shown when a show is selected */}
        {selectedShow && (
          <RightPane 
            selectedShow={selectedShow}
            onClose={() => setSelectedShow(null)}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;