import { createTheme, IconButton, styled, TableCell } from "@mui/material";
import { StatusBadgeProps } from "../types";

export const colors = {
    primary: {
      light: '#60a5fa',
      main: '#3b82f6',
      dark: '#1e40af',
      gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
    },
    status: {
      running: {
        bg: '#ecfdf5',
        text: '#059669',
        border: '#a7f3d0',
        hover: '#d1fae5',
      },
      ended: {
        bg: '#f1f5f9',
        text: '#475569',
        border: '#e2e8f0',
        hover: '#e2e8f0',
      },
      tbd: {
        bg: '#fef3c7',
        text: '#b45309',
        border: '#fde68a',
        hover: '#fde68a',
      },
    },
    genre: {
      bg: '#f0f9ff',
      text: '#0369a1',
      border: '#bae6fd',
      hover: '#e0f2fe',
      hoverBorder: '#7dd3fc',
    },
    background: {
      main: '#f8fafc',
      paper: 'rgba(255, 255, 255, 0.9)',
      gradient: 'radial-gradient(at 100% 0%, rgb(249, 250, 251) 0%, rgb(219, 234, 254) 100%)',
    },
    border: 'rgba(226, 232, 240, 0.8)',
  };
  
  export const shadows = {
    sm: '0 2px 4px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(59, 130, 246, 0.1)',
    lg: '0 6px 8px -1px rgba(59, 130, 246, 0.3), 0 3px 6px -1px rgba(59, 130, 246, 0.15)',
  };
  
  export const transitions = {
    default: 'all 0.2s ease',
  };
  export const tableContainerStyles = {
    minWidth: '100%',
    width: '100%',
    height: '100%',
    overflowX: 'auto',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };
  
  export const tableStyles = {
    minWidth: '100%',
    tableLayout: 'fixed' as const,
  };

  export const StyledTableCell = styled(TableCell)(({  }) => ({
    padding: '16px 20px',
    borderBottom: '1px solid #e2e8f0',
    '&.MuiTableCell-head': {
      backgroundColor: '#ffffff',
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

  export const StatusBadge = styled('div')<StatusBadgeProps>(({ status }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: 1,
    width: 'fit-content',
    ...(status === 'Running' ? {
      backgroundColor: '#ecfdf5',
      color: '#059669',
      border: '1px solid #a7f3d0',
    } : {
      backgroundColor: '#f1f5f9',
      color: '#475569',
      border: '1px solid #e2e8f0',
    }),
  }));


  export const GenreChip = styled('span')({
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '13px',
    backgroundColor: '#f8fafc',
    color: '#3b82f6',
    border: '1px solid #e2e8f0',
    marginRight: '6px',
    marginBottom: '4px',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#f0f9ff',
      borderColor: '#93c5fd',
    },
  });
  
  export const ActionButton = styled(IconButton)({
    width: 34,
    height: 34,
    borderRadius: 8,
    marginLeft: 8,
    backgroundColor: '#f8fafc',
    '&:hover': {
      backgroundColor: '#f1f5f9',
    },
  });

  export const theme = createTheme({
    palette: {
      primary: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#f8fafc'
          }
        }
      }
    }
  });