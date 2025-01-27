import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Drawer,
  Avatar,
  Chip,
  InputLabel,
  alpha,
} from '@mui/material';
import {
  Close as CloseIcon,
  Movie as MovieIcon,
  Language as LanguageIcon,
  Info as InfoIcon,
  Link as LinkIcon,
  LocalOffer as GenreIcon,
} from '@mui/icons-material';
import { FormFieldProps, RightPaneProps, Show } from '../types';



const FormField: React.FC<FormFieldProps> = ({ icon, children }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, width: '100%' }}>
    <Box 
      sx={{ 
        mt: 1,
        p: 1, 
        borderRadius: 1, 
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        color: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {icon}
    </Box>
    {children}
  </Box>
);

const RightPane: React.FC<RightPaneProps> = ({ selectedShow, onClose, onUpdate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    language: '',
    status: '',
    genres: [] as string[],
    officialSite: ''
  });

  
  useEffect(() => {
    if (selectedShow) {
      setFormData({
        name: selectedShow.name,
        type: selectedShow.type,
        language: selectedShow.language,
        status: selectedShow.status,
        genres: [...selectedShow.genres],
        officialSite: selectedShow.officialSite || ''
      });
    }
  }, [selectedShow]);

  const handleChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleDeleteGenre = (genreToDelete: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.filter(genre => genre !== genreToDelete)
    }));
  };

  const handleAddGenre = (newGenre: string) => {
    if (newGenre.trim() && !formData.genres.includes(newGenre)) {
      setFormData(prev => ({
        ...prev,
        genres: [...prev.genres, newGenre.trim()]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedShow) return;

    const updatedShow: Show = {
      ...selectedShow,
      ...formData
    };

    onUpdate(updatedShow);
  };

  if (!selectedShow) return null;

  const content = (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: { xs: '100vw', sm: '400px', lg: '400px' },
        bgcolor: 'background.paper',
      }}
    >
      {/* Header */}
      <Box sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
      }}>
        <Box 
          sx={{ 
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Edit Show
          </Typography>
          <IconButton 
            onClick={onClose} 
            size="small"
            sx={{ 
              bgcolor: 'background.paper',
              transition: 'transform 0.2s',
              '&:hover': {
                bgcolor: 'background.paper',
                transform: 'rotate(90deg)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ px: 3, pb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              variant="rounded"
              src={selectedShow.image?.medium}
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              }}
            >
              {selectedShow.name[0]}
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                ID #{selectedShow.id}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {selectedShow.name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Form Fields */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 3,
        }}
      >
        <Stack spacing={3}>
          <FormField icon={<MovieIcon fontSize="small" />}>
            <TextField
              label="Show Name"
              value={formData.name}
              onChange={handleChange('name')}
              fullWidth
              size="small"
              required
            />
          </FormField>

          <FormField icon={<InfoIcon fontSize="small" />}>
            <TextField
              label="Type"
              value={formData.type}
              onChange={handleChange('type')}
              fullWidth
              size="small"
              required
            />
          </FormField>

          <FormField icon={<LanguageIcon fontSize="small" />}>
            <TextField
              label="Language"
              value={formData.language}
              onChange={handleChange('language')}
              fullWidth
              size="small"
              required
            />
          </FormField>

          <FormField icon={<InfoIcon fontSize="small" />}>
            <TextField
              label="Status"
              value={formData.status}
              onChange={handleChange('status')}
              fullWidth
              size="small"
              required
            />
          </FormField>

          <FormField icon={<GenreIcon fontSize="small" />}>
            <Box sx={{ width: '100%' }}>
              <InputLabel sx={{ mb: 1, fontSize: '0.875rem' }}>Genres</InputLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.genres.map((genre) => (
                  <Chip 
                    key={genre} 
                    label={genre}
                    size="small"
                    onDelete={() => handleDeleteGenre(genre)}
                    sx={{ 
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      color: 'primary.main',
                      '& .MuiChip-deleteIcon': {
                        color: 'primary.main',
                      }
                    }}
                  />
                ))}
                <TextField
                  size="small"
                  placeholder="Add genre"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddGenre((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                  sx={{ maxWidth: 120 }}
                />
              </Box>
            </Box>
          </FormField>

          <FormField icon={<LinkIcon fontSize="small" />}>
            <TextField
              label="Official Site"
              value={formData.officialSite}
              onChange={handleChange('officialSite')}
              fullWidth
              size="small"
              placeholder="https://"
            />
          </FormField>
        </Stack>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        p: 3, 
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.03),
      }}>
        <Stack direction="row" spacing={2}>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            sx={{
              borderRadius: 1.5,
              py: 1,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              }
            }}
          >
            Save Changes
          </Button>
          <Button 
            type="button"
            variant="outlined" 
            fullWidth
            onClick={onClose}
            sx={{
              borderRadius: 1.5,
              py: 1,
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'text.primary',
                bgcolor: 'background.paper',
              }
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="right"
        open={Boolean(selectedShow)}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 'auto',
          },
        }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: 400,
        height: '100vh',
        borderLeft: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
        display: 'block',
        overflow: 'hidden',
        zIndex: theme.zIndex.drawer - 1,
        boxShadow: `0 0 24px ${alpha(theme.palette.common.black, 0.05)}`,
      }}
    >
      {content}
    </Box>
  );
};

export default RightPane;