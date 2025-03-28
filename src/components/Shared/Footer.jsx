import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => 
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} User Management App •{' '}
        <Link color="inherit" href="#">
          Privacy Policy
        </Link>{' '}
        •{' '}
        <Link color="inherit" href="#">
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
}