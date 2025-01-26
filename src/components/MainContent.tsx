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
  Avatar,
  Link,
  styled,
  InputAdornment,
  Tooltip,
  Skeleton,
  CircularProgress,
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
} from '@mui/icons-material';
import ShowDetailsModal from './ShowDetailsModal';
import { Show, MainContentProps } from '../types';

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '16px 20px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  '&.MuiTableCell-head': {
    backgroundColor: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
}));

const StatusBadge = styled('div')<{ $status: string }>(({ $status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 600,
  lineHeight: 1,
  width: 'fit-content',
  ...($status === 'Running' ? {
    backgroundColor: '#ecfdf5',
    color: '#059669',
    border: '1px solid #a7f3d0',
  } : {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: '1px solid #e2e8f0',
  }),
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  width: 34,
  height: 34,
  borderRadius: 8,
  marginLeft: 8,
  backgroundColor: '#f8fafc',
  '&:hover': {
    backgroundColor: '#f1f5f9',
  },
}));

const GenreChip = styled('span')({
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: '16px',
  fontSize: '13px',
  backgroundColor: '#f8fafc',
  color: '#3b82f6',
  border: '1px solid #e2e8f0',
  marginRight: '6px',
  marginBottom: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#f0f9ff',
    borderColor: '#93c5fd',
  },
});

const SectionButton = styled(Button)({
  textTransform: 'none',
  borderRadius: '12px',
  padding: '8px 16px',
  fontWeight: 500,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
});

const EmptyState = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      px: 2,
    }}
  >
    <EmptyIcon
      sx={{
        fontSize: 48,
        color: '#94a3b8',
        mb: 2,
      }}
    />
    <Typography
      variant="h6"
      sx={{
        color: '#475569',
        mb: 1,
        fontWeight: 600,
      }}
    >
      No shows found
    </Typography>
    <Typography
      variant="body2"
      sx={{
        color: '#64748b',
        textAlign: 'center',
        maxWidth: 300,
      }}
    >
      Try adjusting your search or filters to find what you're looking for.
    </Typography>
  </Box>
);

const LoadingSkeleton = () => (
  <>
    {[...Array(5)].map((_, index) => (
      <TableRow key={index}>
        {[...Array(7)].map((_, cellIndex) => (
          <TableCell key={cellIndex}>
            <Skeleton animation="wave" height={24} />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

const MainContent: React.FC<MainContentProps> = ({
  onShowSelect,
  handleDrawerToggle,
}) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShowForModal, setSelectedShowForModal] = useState<Show | null>(null);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://api.tvmaze.com/shows?page=${page}`);
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [page]);

  const filteredShows = shows.filter(show =>
    show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box 
      sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f8fafc',
        minWidth: 0, // Important for proper flex behavior
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 4 },
          py: 2.5,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'flex', lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
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
            <Typography variant="body2" color="text.secondary">
              Manage your TV show collection
            </Typography>
          </Box>
        </Box>
        <SectionButton
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#3b82f6',
            '&:hover': {
              bgcolor: '#2563eb',
            },
          }}
        >
          Add Show
        </SectionButton>
      </Box>

      {/* Search and Filters */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          p: { xs: 2, sm: 4 },
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
        }}
      >
        <TextField
          placeholder="Search shows..."
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: { sm: '400px' },
            backgroundColor: '#ffffff',
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '&:hover fieldset': {
                borderColor: '#3b82f6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
                borderWidth: '1px',
              },
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
          <SectionButton
            variant="outlined"
            startIcon={<TuneIcon />}
            sx={{
              borderColor: '#e2e8f0',
              color: '#64748b',
              '&:hover': {
                borderColor: '#3b82f6',
                backgroundColor: '#ffffff',
              },
            }}
          >
            Filters
          </SectionButton>
          <SectionButton
            variant="outlined"
            startIcon={<SortIcon />}
            sx={{
              borderColor: '#e2e8f0',
              color: '#64748b',
              '&:hover': {
                borderColor: '#3b82f6',
                backgroundColor: '#ffffff',
              },
            }}
          >
            Sort
          </SectionButton>
        </Box>
      </Box>

      {/* Table Section */}
      <Box
        sx={{
          mx: { xs: 2, sm: 4 },
          mb: { xs: 2, sm: 4 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          minWidth: 0, // Important for table overflow
        }}
      >
        <TableContainer sx={{ flex: 1, minHeight: 0 }}>
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
              {loading ? (
                <LoadingSkeleton />
              ) : filteredShows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ border: 'none' }}>
                    <EmptyState />
                  </TableCell>
                </TableRow>
              ) : (
                filteredShows.map((show) => (
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
                      <StatusBadge $status={show.status}>
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
                          onClick={() => setSelectedShowForModal(show)}
                          size="small"
                        >
                          <VisibilityIcon sx={{ fontSize: 18 }} />
                        </ActionButton>
                      </Tooltip>
                    </StyledTableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #e2e8f0',
            px: 3,
            py: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {filteredShows.length} results
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              sx={{
                width: 32,
                height: 32,
                backgroundColor: '#f8fafc',
                '&:hover:not(:disabled)': {
                  backgroundColor: '#f1f5f9',
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setPage((p) => p + 1)}
              sx={{
                width: 32,
                height: 32,
                backgroundColor: '#f8fafc',
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Show Details Modal */}
      <ShowDetailsModal
        show={selectedShowForModal}
        onClose={() => setSelectedShowForModal(null)}
      />
    </Box>
  );
};

export default MainContent;