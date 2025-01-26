// components/LoadingIndicator.tsx
import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  keyframes,
} from '@mui/material';

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const LoadingIndicator: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        gap: 2,
      }}
    >
      <CircularProgress
        size={40}
        thickness={4}
        sx={{
          color: '#3b82f6',
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
        }}
      >
        Loading shows...
      </Typography>
    </Box>
  );
};

export default LoadingIndicator;