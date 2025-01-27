// App.tsx
import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightPane from './components/RightPane';
import { Show } from './types';
import { theme } from './theme/constants';

const DRAWER_WIDTH = 240;

const App: React.FC = () => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [shows, setShows] = useState<Show[]>([]); 

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handleShowUpdate = (updatedShow: Show) => {
    setShows(prevShows => 
      prevShows.map(show => 
        show.id === updatedShow.id ? updatedShow : show
      )
    );
    setSelectedShow(null); 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
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
            shows={shows}
            setShows={setShows}
            onShowSelect={setSelectedShow}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Box>

        {selectedShow && (
          <RightPane 
            selectedShow={selectedShow}
            onClose={() => setSelectedShow(null)}
            onUpdate={handleShowUpdate}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;