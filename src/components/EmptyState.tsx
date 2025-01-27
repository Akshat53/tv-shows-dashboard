// EmptyState.tsx
import React from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,

} from '@mui/material';
import { InsertDriveFile as EmptyIcon } from '@mui/icons-material';
import { StyledTableCell, tableContainerStyles, tableStyles } from '../theme/constants';


const EmptyState: React.FC = () => {
    return (
        <TableContainer sx={tableContainerStyles}>
            <Table stickyHeader sx={tableStyles}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell width="25%">Show Name</StyledTableCell>
                        <StyledTableCell width="10%">Type</StyledTableCell>
                        <StyledTableCell width="10%">Language</StyledTableCell>
                        <StyledTableCell width="15%">Status</StyledTableCell>
                        <StyledTableCell width="20%">Genres</StyledTableCell>
                        <StyledTableCell width="10%">Official Site</StyledTableCell>
                        <StyledTableCell width="10%" align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell
                            colSpan={7}
                            sx={{
                                height: '400px',
                                border: 'none',
                                p: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 3,
                                }}
                            >
                                <EmptyIcon
                                    sx={{
                                        fontSize: 48,
                                        color: '#94a3b8',
                                        mb: 2
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#475569',
                                        mb: 1,
                                        fontWeight: 600
                                    }}
                                >
                                    No shows found
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#64748b',
                                        maxWidth: 300,
                                        textAlign: 'center'
                                    }}
                                >
                                    Try adjusting your search or filters to find what you're looking for.
                                </Typography>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};


export default EmptyState;