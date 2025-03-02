// src/components/MainContent.tsx
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
  Avatar,
  Link,

  InputAdornment,
  Tooltip,
  Alert,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  TuneOutlined as TuneIcon,
  SortOutlined as SortIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  InsertDriveFile as EmptyIcon,
  RefreshOutlined as RefreshIcon,
} from '@mui/icons-material';
import ShowDetailsModal from './ShowDetailsModal';
import LoadingIndicator from './LoadingIndicator';
import { Show, MainContentProps } from '../types';
import EmptyState from './EmptyState';
import _ from 'lodash';
import { ActionButton, GenreChip, StatusBadge, StyledTableCell } from '../theme/constants';
import "../styles/animations.css"

const MainContent: React.FC<MainContentProps> = ({
  shows,
  setShows,
  onShowSelect,
  handleDrawerToggle,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedShowForModal, setSelectedShowForModal] = useState<Show | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState(shows);

  const fetchShows = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/services/shows?page=${page}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch shows (HTTP ${response.status})`);
      }
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error('Error fetching shows:', error);
      setError('Unable to fetch shows. Please try again later.');
      setShows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, [page]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = shows.filter(show =>
        show.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, shows]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setCurrentPage(newPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#f8fafc',
      minWidth: 0,
    }}>
      {/* Header */}
      <Box sx={{
        px: 4,
        py: 3,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'flex', lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                background: 'linear-gradient(90deg, #1e40af 0%, #3b82f6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              TV Shows
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              px: 3,
              bgcolor: '#3b82f6',
              '&:hover': {
                bgcolor: '#2563eb',
              },
            }}
          >
            Add Show
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Manage your TV show collection
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{
        p: 4,
        display: 'flex',
        gap: 2,
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
      }}>
        <TextField
          placeholder="Search shows..."
          size="small"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            maxWidth: { sm: '400px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#ffffff',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<TuneIcon />}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              borderColor: '#e2e8f0',
              color: '#64748b',
              '&:hover': {
                borderColor: '#3b82f6',
                backgroundColor: '#ffffff',
              },
            }}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              borderColor: '#e2e8f0',
              color: '#64748b',
              '&:hover': {
                borderColor: '#3b82f6',
                backgroundColor: '#ffffff',
              },
            }}
          >
            Sort
          </Button>
        </Box>
      </Box>

      {/* Content Area */}
      <Paper
        elevation={0}
        sx={{
          mx: 4,
          mb: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          width: 'auto',
          minWidth: 0,
        }}
      >
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <Box sx={{ p: 3 }}>
            <Alert
              severity="error"
              action={
                <Button
                  color="inherit"
                  size="small"
                  startIcon={<RefreshIcon />}
                  onClick={fetchShows}
                >
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        ) : filteredResults.length === 0 ? (
          <EmptyState />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <TableContainer sx={{ flex: 1 }}>
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
                  {filteredResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <Box sx={{ py: 8, textAlign: 'center' }}>
                          <EmptyIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 2 }} />
                          <Typography variant="h6" sx={{ color: '#475569', mb: 1, fontWeight: 600 }}>
                            No shows found
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#64748b', maxWidth: 300, mx: 'auto' }}>
                            Try adjusting your search or filters to find what you're looking for.
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredResults.map((show) => (
                      <TableRow
                        key={show.id}
                        hover
                        sx={{
                          '&:hover': {
                            backgroundColor: '#f8fafc',
                          },
                        }}
                      >
                        <StyledTableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              variant="rounded"
                              src={show.image?.medium}
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '8px',
                              }}
                            >
                              {show.name[0]}
                            </Avatar>
                            <Typography sx={{ fontWeight: 500 }}>
                              {show.name}
                            </Typography>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>{show.type}</StyledTableCell>
                        <StyledTableCell>{show.language}</StyledTableCell>
                        <StyledTableCell>
                          <StatusBadge status={show.status}>
                            {show.status}
                          </StatusBadge>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {show.genres.map((genre) => (
                              <GenreChip key={genre}>{genre}</GenreChip>
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
                                color: '#3b82f6',
                                textDecoration: 'none',
                                fontWeight: 500,
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
                          <div className='d-flex'>
                          <Tooltip title="Edit Show">
                            <ActionButton
                              onClick={() => onShowSelect(show)}  
                              size="small"
                            >
                              <EditIcon sx={{ fontSize: 18 }} />
                            </ActionButton>
                          </Tooltip>
                          <Tooltip title="View Details">
                            <ActionButton
                              onClick={() => setSelectedShowForModal(show)} // This opens the details modal
                              size="small"
                            >
                              <VisibilityIcon sx={{ fontSize: 18 }} />
                            </ActionButton>
                          </Tooltip>
                          </div>
                        </StyledTableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {filteredResults.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #e2e8f0',
                  bgcolor: '#ffffff',
                  p: 3,
                  mt: 'auto',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Page {currentPage} of 5 • Showing {filteredResults.length} results
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {[...Array(5)].map((_, idx) => (
                      <Button
                        key={idx}
                        variant={currentPage === idx + 1 ? "contained" : "text"}
                        onClick={() => handlePageChange(idx)}
                        sx={{
                          minWidth: '40px',
                          height: '40px',
                          p: 0,
                          borderRadius: '10px',
                          color: currentPage === idx + 1 ? 'white' : '#64748b',
                          bgcolor: currentPage === idx + 1 ? '#3b82f6' : 'transparent',
                          '&:hover': {
                            bgcolor: currentPage === idx + 1 ? '#2563eb' : '#f1f5f9',
                          },
                        }}
                      >
                        {idx + 1}
                      </Button>
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                    <IconButton
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 0}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        bgcolor: '#f8fafc',
                        '&:hover:not(:disabled)': {
                          bgcolor: '#f1f5f9',
                        },
                      }}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === 4}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        bgcolor: '#f8fafc',
                        '&:hover:not(:disabled)': {
                          bgcolor: '#f1f5f9',
                        },
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Paper>

      {/* Details Modal */}
      <ShowDetailsModal
        show={selectedShowForModal}
        onClose={() => setSelectedShowForModal(null)}
      />
    </Box>
  );
};

export default MainContent;