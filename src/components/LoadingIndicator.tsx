// LoadingIndicator.tsx
import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,

} from '@mui/material';
import { StyledTableCell, tableContainerStyles, tableStyles } from '../theme/constants';


const LoadingIndicator: React.FC = () => {
  return (
    <TableContainer sx={tableContainerStyles}>
      <Table stickyHeader sx={tableStyles}>
        <TableHead>
          <TableRow>
            <StyledTableCell width="25%">
              <Box sx={{ height: 20, bgcolor: '#f1f5f9', borderRadius: 1, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </StyledTableCell>
            <StyledTableCell width="10%">
              <Box sx={{ height: 20, bgcolor: '#f1f5f9', borderRadius: 1, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </StyledTableCell>
            <StyledTableCell width="10%">
              <Box sx={{ height: 20, bgcolor: '#f1f5f9', borderRadius: 1, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </StyledTableCell>
            <StyledTableCell width="15%">
              <Box sx={{ height: 20, bgcolor: '#f1f5f9', borderRadius: 1, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </StyledTableCell>
            <StyledTableCell width="20%">
              <Box sx={{ height: 20, bgcolor: '#f1f5f9', borderRadius: 1, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </StyledTableCell>
            <StyledTableCell width="10%">
              <Box sx={{ height: 20, bgcolor: '#f1f5f9', borderRadius: 1, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </StyledTableCell>
            <StyledTableCell width="10%" align="right">
              <Box sx={{ height: 20, bgcolor: '#f1f5f9', borderRadius: 1, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_, idx) => (
            <TableRow key={idx}>
              {/* ... rest of your loading rows ... */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LoadingIndicator;