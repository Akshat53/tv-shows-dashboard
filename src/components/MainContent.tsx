// components/MainContent.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Link,
  styled,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import ShowDetailsModal from './ShowDetailsModal';
import { Show, MainContentProps } from '../types';

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  whiteSpace: 'nowrap',
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.background.paper,
    fontWeight: 600,
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: 6,
  marginLeft: 8,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: theme.palette.action.hover,
  fontWeight: 500,
  fontSize: '0.8125rem',
}));

const MainContent: React.FC<MainContentProps> = ({ 
  onShowSelect, 
  handleDrawerToggle 
}) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedShowForModal, setSelectedShowForModal] = useState<Show | null>(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(`http://api.tvmaze.com/shows?page=${page}`);
        const data: Show[] = await response.json();
        setShows(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shows:', error);
        setLoading(false);
      }
    };

    fetchShows();
  }, [page]);

  const filteredShows = shows.filter(show =>
    show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ 
        px: 3, 
        py: 2,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ 
              display: { xs: 'inline-flex', lg: 'none' },
              mr: 1 
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">TV Shows</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 2,
          }}
        >
          Add Show
        </Button>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ 
        p: 3,
        display: 'flex',
        gap: 2,
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
      }}>
        <TextField
          placeholder="Search shows..."
          size="small"
          fullWidth
          sx={{ 
            maxWidth: { sm: '320px' },
            '.MuiOutlinedInput-root': {
              borderRadius: 3,
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            borderColor: 'divider',
            color: 'primary.main',
            px: 2,
          }}
        >
          Filters
        </Button>
      </Box>

      {/* Table Section */}
      <Box sx={{ 
        flex: 1,
        mx: 3,
        mb: 3,
        overflow: 'auto',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Show Name</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Language</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Genres</StyledTableCell>
                <StyledTableCell>Official Site</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredShows.map((show) => (
                <TableRow 
                  key={show.id}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: 'background.default',
                    },
                  }}
                >
                  <StyledTableCell sx={{ fontWeight: 500 }}>
                    {show.name}
                  </StyledTableCell>
                  <StyledTableCell>{show.type}</StyledTableCell>
                  <StyledTableCell>{show.language}</StyledTableCell>
                  <StyledTableCell>
                    <StatusChip 
                      label={show.status} 
                      size="small"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {show.genres.map((genre) => (
                        <Link
                          key={genre}
                          href="#"
                          sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {genre}
                        </Link>
                      ))}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    {show.officialSite && (
                      <Link
                        href={show.officialSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Visit Site
                      </Link>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <ActionButton
                      size="small"
                      onClick={() => onShowSelect(show)}
                    >
                      <EditIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton
                      size="small"
                      onClick={() => setSelectedShowForModal(show)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </ActionButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination */}
      <Box 
        sx={{ 
          px: 3,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          11-20 of 250
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small">
            <Box sx={{ transform: 'rotate(180deg)' }}>›</Box>
          </IconButton>
          <IconButton size="small">
            ›
          </IconButton>
        </Box>
      </Box>

      <ShowDetailsModal
        show={selectedShowForModal}
        onClose={() => setSelectedShowForModal(null)}
      />
    </Box>
  );
};

export default MainContent;