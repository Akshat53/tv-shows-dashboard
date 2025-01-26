// components/RightPane.tsx
import React from 'react';
import {
  Box,
  
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { RightPaneProps } from '../types';

const RightPane: React.FC<RightPaneProps> = ({ selectedShow, onClose }) => {
  const theme = useTheme();
  
  if (!selectedShow) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
    onClose();
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: 320,
        height: '100vh',
        borderLeft: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
        display: { xs: 'none', lg: 'block' },
        overflow: 'hidden',
        zIndex: theme.zIndex.drawer - 1,
      }}
    >
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box 
          sx={{ 
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">
            Edit Show
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form Fields */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
          }}
        >
          <Stack spacing={2.5}>
            <TextField
              label="Show Name"
              defaultValue={selectedShow.name}
              fullWidth
              size="small"
              required
            />

            <TextField
              label="Type"
              defaultValue={selectedShow.type}
              fullWidth
              size="small"
              required
            />

            <TextField
              label="Language"
              defaultValue={selectedShow.language}
              fullWidth
              size="small"
              required
            />

            <TextField
              label="Status"
              defaultValue={selectedShow.status}
              fullWidth
              size="small"
              required
            />

            <FormControl fullWidth size="small">
              <InputLabel>Genres</InputLabel>
              <OutlinedInput
                label="Genres"
                defaultValue={selectedShow.genres.join(', ')}
                multiline
                rows={2}
              />
            </FormControl>

            <TextField
              label="Official Site"
              defaultValue={selectedShow.officialSite || ''}
              fullWidth
              size="small"
            />
          </Stack>
        </Box>

        {/* Footer with Actions */}
        <Box sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          backgroundColor: 'background.default',
        }}>
          <Stack direction="row" spacing={2}>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
            >
              Save Changes
            </Button>
            <Button 
              type="button"
              variant="outlined" 
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default RightPane;