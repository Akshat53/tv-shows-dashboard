// components/LoadingIndicator.tsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingIndicator: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 400,
      gap: 2,
    }}
  >
    <CircularProgress size={40} sx={{ color: '#3b82f6' }} />
    <Typography variant="body2" color="text.secondary">
      Loading shows...
    </Typography>
  </Box>
);

export default LoadingIndicator;