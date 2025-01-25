// components/ShowDetailsModal.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Chip,
  Link,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import {
  Close as CloseIcon,
  Schedule as ScheduleIcon,
  Language as LanguageIcon,
  Star as StarIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { ShowDetailsModalProps } from '../types';

const InfoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(3),
}));

const ShowDetailsModal: React.FC<ShowDetailsModalProps> = ({ show, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!show) return null;

  return (
    <Dialog
      open={Boolean(show)}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: '16px' },
          m: { xs: 0, sm: 2 },
          height: { xs: '100%', sm: 'auto' },
        },
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          p: 3, 
          display: 'flex', 
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            {show.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {show.genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                sx={{
                  borderRadius: '8px',
                  backgroundColor: 'primary.light',
                  color: 'primary.dark',
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </Box>
        <IconButton 
          onClick={onClose}
          sx={{ 
            bgcolor: 'background.default',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={4}>
          {/* Show Image */}
          <Grid item xs={12} md={4}>
            {show.image && (
              <Box
                component="img"
                src={show.image.original}
                alt={show.name}
                sx={{
                  width: '100%',
                  borderRadius: '16px',
                  boxShadow: theme.shadows[1],
                }}
              />
            )}
          </Grid>

          {/* Show Details */}
          <Grid item xs={12} md={8}>
            {/* Status and Rating */}
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                mb: 4,
                flexWrap: 'wrap',
              }}
            >
              <Chip
                label={show.status}
                size="small"
                sx={{
                  borderRadius: '8px',
                  backgroundColor: show.status === 'Running' 
                    ? 'success.light' 
                    : 'default',
                  color: show.status === 'Running' 
                    ? 'success.dark'
                    : 'text.primary',
                  fontWeight: 500,
                  px: 1,
                }}
              />
              {show.rating.average && (
                <Chip
                  icon={<StarIcon sx={{ color: 'warning.main' }} />}
                  label={`${show.rating.average}/10`}
                  size="small"
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: 'warning.light',
                    color: 'warning.dark',
                    fontWeight: 500,
                    px: 1,
                  }}
                />
              )}
            </Box>

            {/* Schedule */}
            <InfoSection>
              <ScheduleIcon sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Schedule
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {show.schedule.days.join(', ')} at {show.schedule.time || 'N/A'}
                </Typography>
              </Box>
            </InfoSection>

            {/* Network */}
            <InfoSection>
              <LanguageIcon sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Network
                </Typography>
                {show.network ? (
                  <Typography variant="body2" color="text.secondary">
                    {show.network.name} ({show.network.country.name})
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Not available
                  </Typography>
                )}
              </Box>
            </InfoSection>

            {/* Premiered */}
            <InfoSection>
              <CalendarIcon sx={{ color: 'primary.main' }} />
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Premiered
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {show.premiered || 'N/A'}
                </Typography>
              </Box>
            </InfoSection>

            {/* Summary */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Summary
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
                sx={{
                  '& p': { mt: 1 },
                  lineHeight: 1.6,
                }}
                dangerouslySetInnerHTML={{ __html: show.summary }}
              />
            </Box>

            {/* Official Site */}
            {show.officialSite && (
              <Box sx={{ mt: 3 }}>
                <Link
                  href={show.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <LanguageIcon fontSize="small" />
                  Visit Official Website
                </Link>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ShowDetailsModal;