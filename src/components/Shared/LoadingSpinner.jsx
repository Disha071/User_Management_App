import { CircularProgress, Box } from '@mui/material';

export default function LoadingSpinner({ fullPage = false }) {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: fullPage ? '100vh' : '100%'
      }}
    >
      <CircularProgress />
    </Box>
  );
}