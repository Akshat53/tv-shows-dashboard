import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingIndicator = () => (
  <Box
    sx={{
      width: '100%',
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
    }}
  >
    <CircularProgress 
      size={40} 
      sx={{ 
        color: '#3b82f6',
      }} 
    />
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'text.secondary',
        fontWeight: 500
      }}
    >
      Loading shows...
    </Typography>
  </Box>
);

export default LoadingIndicator;