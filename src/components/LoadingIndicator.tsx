import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { colors } from '../theme/constants';

const LoadingIndicator: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px',
      gap: 2,
    }}
  >
    <CircularProgress
      size={40}
      sx={{
        color: colors.primary.main,
        animation: 'float 3s ease-in-out infinite',
      }}
    />
    <Typography
      variant="body2"
      sx={{
        color: 'text.secondary',
        animation: 'fadeIn 0.5s ease-out',
      }}
    >
      Loading shows...
    </Typography>
  </Box>
);

export default LoadingIndicator;