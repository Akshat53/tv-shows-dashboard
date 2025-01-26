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
  styled,
  InputAdornment,
  Tooltip,
  Alert,
  Fade,
  Paper,
  Chip,
  Badge,
  alpha,
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
  Star as StarIcon,
} from '@mui/icons-material';
import { Show, MainContentProps } from '../types';
import { colors, shadows, transitions } from '../theme/constants';
import ShowDetailsModal from './ShowDetailsModal';
import LoadingIndicator from './LoadingIndicator';
import '../styles/animations.css';

// Styled Components
const StyledTableCell = styled(TableCell)(({  }) => ({
  padding: '16px 20px',
  borderBottom: `1px solid ${colors.border}`,
  transition: transitions.default,
  '&.MuiTableCell-head': {
    backgroundColor: colors.background.paper,
    backdropFilter: 'blur(8px)',
    fontSize: '13px',
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    position: 'sticky',
    top: 0,
    zIndex: 2,
  },
  '&:first-of-type': {
    paddingLeft: '24px',
  },
  '&:last-of-type': {
    paddingRight: '24px',
  },
}));

const StyledTableRow = styled(TableRow)({
  transition: transitions.default,
  '&:hover': {
    backgroundColor: alpha(colors.background.paper, 0.8),
    transform: 'scale(1.001)',
    '& .row-actions': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
});

const StatusChip = styled(Chip)<{ status: string }>(({ status }) => ({
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 600,
  height: '28px',
  transition: transitions.default,
  ...(status === 'Running' && {
    backgroundColor: colors.status.running.bg,
    color: colors.status.running.text,
    border: `1px solid ${colors.status.running.border}`,
    '&:hover': {
      backgroundColor: colors.status.running.hover,
    },
  }),
  ...(status === 'Ended' && {
    backgroundColor: colors.status.ended.bg,
    color: colors.status.ended.text,
    border: `1px solid ${colors.status.ended.border}`,
    '&:hover': {
      backgroundColor: colors.status.ended.hover,
    },
  }),
  ...(status === 'To Be Determined' && {
    backgroundColor: colors.status.tbd.bg,
    color: colors.status.tbd.text,
    border: `1px solid ${colors.status.tbd.border}`,
    '&:hover': {
      backgroundColor: colors.status.tbd.hover,
    },
  }),
}));

const GenreChip = styled(Chip)({
  borderRadius: '16px',
  fontSize: '13px',
  height: '24px',
  backgroundColor: colors.genre.bg,
  color: colors.genre.text,
  border: `1px solid ${colors.genre.border}`,
  transition: transitions.default,
  '&:hover': {
    backgroundColor: colors.genre.hover,
    borderColor: colors.genre.hoverBorder,
    transform: 'translateY(-1px)',
  },
});

const ActionButton = styled(IconButton)({
  width: 34,
  height: 34,
  borderRadius: 8,
  marginLeft: 8,
  backgroundColor: colors.background.paper,
  transition: transitions.default,
  '&:hover': {
    backgroundColor: alpha(colors.primary.main, 0.1),
    transform: 'translateY(-1px)',
    boxShadow: shadows.sm,
  },
});

const PaginationButton = styled(Button)<{ active?: boolean }>(({ active }) => ({
  minWidth: '40px',
  height: '40px',
  padding: 0,
  borderRadius: '10px',
  color: active ? '#ffffff' : '#64748b',
  backgroundColor: active ? colors.primary.main : 'transparent',
  transition: transitions.default,
  '&:hover': {
    backgroundColor: active ? colors.primary.dark : alpha(colors.primary.main, 0.1),
    transform: 'translateY(-1px)',
  },
}));

const SearchField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: colors.background.paper,
    transition: transitions.default,
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: shadows.sm,
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      boxShadow: shadows.md,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.primary.main,
        borderWidth: '2px',
      },
    },
  },
});

// Empty State Component
const EmptyState: React.FC = () => (
  <Box sx={{ 
    py: 8, 
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease-out'
  }}>
    <EmptyIcon sx={{ 
      fontSize: 48, 
      color: '#94a3b8', 
      mb: 2,
      animation: 'float 3s ease-in-out infinite'
    }} />
    <Typography variant="h6" sx={{ color: '#475569', mb: 1, fontWeight: 600 }}>
      No shows found
    </Typography>
    <Typography variant="body2" sx={{ color: '#64748b', maxWidth: 300, mx: 'auto' }}>
      Try adjusting your search or filters to find what you're looking for.
    </Typography>
  </Box>
);

const MainContent: React.FC<MainContentProps> = ({
  onShowSelect,
  handleDrawerToggle,
}) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedShowForModal, setSelectedShowForModal] = useState<Show | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/services';

  const fetchShows = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/shows?page=${page}`, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch shows (HTTP ${response.status})`);
      }
      
      const data = await response.json();
      setShows(data);
      setTotalResults(data.length);
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

  const filteredShows = shows.filter(show =>
    show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
    setCurrentPage(newPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.background.main,
        backgroundImage: colors.background.gradient,
        minWidth: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          px: 4,
          py: 3,
          backgroundColor: colors.background.paper,
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${colors.border}`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ 
                display: { xs: 'flex', lg: 'none' },
                transition: transitions.default,
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: colors.primary.gradient,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                TV Shows
              </Typography>
              <Badge
                badgeContent={totalResults}
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '12px',
                    height: '20px',
                    minWidth: '20px',
                    borderRadius: '10px',
                  }
                }}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              px: 3,
              py: 1,
              background: colors.primary.gradient,
              boxShadow: shadows.md,
              transition: transitions.default,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: shadows.lg,
              },
              '&:active': {
                transform: 'translateY(-1px)',
              },
            }}
          >
            Add Show
          </Button>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <StarIcon sx={{ fontSize: 16, color: colors.primary.main }} />
          Discover and manage your favorite TV shows
        </Typography>
      </Paper>

      {/* Search and Filters */}
      <Box sx={{ 
        p: 4,
        display: 'flex',
        gap: 2,
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
      }}>
        <SearchField
          placeholder="Search shows..."
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: { sm: '400px' },
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
              borderColor: colors.border,
              color: '#64748b',
              backgroundColor: colors.background.paper,
              transition: transitions.default,
              '&:hover': {
                borderColor: colors.primary.main,
                backgroundColor: '#ffffff',
                transform: 'translateY(-1px)',
                boxShadow: shadows.sm,
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
              borderColor: colors.border,
              color: '#64748b',
              backgroundColor: colors.background.paper,
              transition: transitions.default,
              '&:hover': {
                borderColor: colors.primary.main,
                backgroundColor: '#ffffff',
                transform: 'translateY(-1px)',
                boxShadow: shadows.sm,
              },
            }}
          >
            Sort
          </Button>
        </Box>
      </Box>

      {/* Table Container */}
      <Paper
        elevation={0}
        sx={{
          mx: 4,
          mb: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: colors.background.paper,
          borderRadius: '16px',
          border: `1px solid ${colors.border}`,
          overflow: 'hidden',
          backdropFilter: 'blur(8px)',
          boxShadow: shadows.sm,
        }}
      >
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <Box sx={{ p: 3 }}>
            <Alert 
              severity="error" 
              sx={{
                borderRadius: '12px',
                '& .MuiAlert-icon': {
                  color: '#ef4444'
                }
              }}
              action={
                <Button
                  color="error"
                  size="small"
                  startIcon={<RefreshIcon />}
                  onClick={fetchShows}
                  sx={{
                    borderRadius: '8px',
                    transition: transitions.default,
                    '&:hover': {
                      transform: 'translateY(-1px)',
                    },}}
                    >
                      Retry
                    </Button>
                  }
                >
                  {error}
                </Alert>
              </Box>
            ) : (
              <Fade in={!loading}>
                <Box>
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
                        {filteredShows.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7}>
                              <EmptyState />
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredShows.map((show) => (
                            <StyledTableRow
                              key={show.id}
                              hover
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
                                      boxShadow: shadows.sm,
                                      transition: transitions.default,
                                      '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: shadows.md,
                                      }
                                    }}
                                  >
                                    {show.name[0]}
                                  </Avatar>
                                  <Box>
                                    <Typography sx={{ 
                                      fontWeight: 500,
                                      color: '#1e293b',
                                      transition: transitions.default,
                                      '&:hover': {
                                        color: colors.primary.main,
                                      }
                                    }}>
                                      {show.name}
                                    </Typography>
                                    {show.network && (
                                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        {show.network.name}
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>
                              </StyledTableCell>
                              <StyledTableCell>{show.type}</StyledTableCell>
                              <StyledTableCell>{show.language}</StyledTableCell>
                              <StyledTableCell>
                                <StatusChip
                                  label={show.status}
                                  status={show.status}
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                  {show.genres.map((genre) => (
                                    <GenreChip
                                      key={genre}
                                      label={genre}
                                      size="small"
                                    />
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
                                      color: colors.primary.main,
                                      textDecoration: 'none',
                                      fontWeight: 500,
                                      transition: transitions.default,
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: 0.5,
                                      '&:hover': {
                                        color: colors.primary.dark,
                                        textDecoration: 'underline',
                                        transform: 'translateY(-1px)',
                                      },
                                    }}
                                  >
                                    Visit Site
                                  </Link>
                                )}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <Box 
                                  className="row-actions"
                                  sx={{ 
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    opacity: 0.4,
                                    transform: 'translateX(10px)',
                                    transition: transitions.default,
                                  }}
                                >
                                  <Tooltip title="Edit Show" arrow placement="top">
                                    <ActionButton
                                      onClick={() => onShowSelect(show)}
                                      size="small"
                                    >
                                      <EditIcon sx={{ fontSize: 18 }} />
                                    </ActionButton>
                                  </Tooltip>
                                  <Tooltip title="View Details" arrow placement="top">
                                    <ActionButton
                                      onClick={() => setSelectedShowForModal(show)}
                                      size="small"
                                    >
                                      <VisibilityIcon sx={{ fontSize: 18 }} />
                                    </ActionButton>
                                  </Tooltip>
                                </Box>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
    
                  {/* Pagination */}
                  {!loading && filteredShows.length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: `1px solid ${colors.border}`,
                        bgcolor: colors.background.paper,
                        p: 3,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Page {currentPage} of 5 • Showing {filteredShows.length} results
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {[...Array(5)].map((_, idx) => (
                            <PaginationButton
                              key={idx}
                              active={currentPage === idx + 1}
                              onClick={() => handlePageChange(idx)}
                              variant={currentPage === idx + 1 ? "contained" : "text"}
                              disableElevation
                            >
                              {idx + 1}
                            </PaginationButton>
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
                              bgcolor: colors.background.paper,
                              transition: transitions.default,
                              '&:hover:not(:disabled)': {
                                bgcolor: alpha(colors.primary.main, 0.1),
                                transform: 'translateY(-1px)',
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
                              bgcolor: colors.background.paper,
                              transition: transitions.default,
                              '&:hover:not(:disabled)': {
                                bgcolor: alpha(colors.primary.main, 0.1),
                                transform: 'translateY(-1px)',
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
              </Fade>
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