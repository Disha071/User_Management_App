import { Outlet } from 'react-router-dom';
import { 
  Box,
  CssBaseline,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer'; // Create this component for a complete layout

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default
        }}
      >
        {/* Navbar with elevation on scroll */}
        <Navbar />

        {/* Main content with smooth entrance animation */}
        <Box
          component={motion.main}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            flexGrow: 1,
            py: isMobile ? 2 : 4,
            px: isMobile ? 1.5 : 3,
            width: '100%',
            maxWidth: 'lg',
            mx: 'auto'
          }}
        >
          <Container 
            maxWidth="lg" 
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 2, sm: 3 },
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1
            }}
          >
            <Outlet />
          </Container>
        </Box>

        {/* Footer component - create this separately */}
        <Footer />
      </Box>
    </>
  );
}