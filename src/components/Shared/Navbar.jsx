import { useState } from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  ExitToApp, 
  Login,
  Menu as MenuIcon,
  AccountCircle
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  return (
    <AppBar 
      position="sticky"
      elevation={1}
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        backdropFilter: 'blur(8px)',
        backgroundImage: 'none'
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        px: { xs: 2, sm: 3 },
        py: 1
      }}>
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center',
            mr: 2
          }}
        >
          <Avatar 
            src="/logo192.png" 
            sx={{ 
              mr: 2,
              width: 40,
              height: 40,
              boxShadow: theme.shadows[2]
            }}
          />
          <Typography 
            variant="h6" 
            noWrap
            sx={{ 
              fontWeight: 700,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(45deg, #64b5f6, #42a5f5)'
                : 'linear-gradient(45deg, #1976d2, #0d47a1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            UserManager
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              {isMobile ? (
                <IconButton
                  size="large"
                  edge="end"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AccountCircle />}
                    endIcon={<ExitToApp />}
                    onClick={handleLogout}
                    sx={{
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 3,
                      py: 1,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2
                      }
                    }}
                  >
                    {user?.first_name || 'Account'}
                  </Button>
                </motion.div>
              )}

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    overflow: 'visible',
                    mt: 1.5,
                    minWidth: 200,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => navigate('/profile')}>
                  <AccountCircle sx={{ mr: 1.5 }} /> My Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                  <ExitToApp sx={{ mr: 1.5 }} /> Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                startIcon={<Login />}
                size={isMobile ? 'medium' : 'large'}
                sx={{
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 'none'
                  }
                }}
              >
                {isMobile ? 'Login' : 'Sign In'}
              </Button>
            </motion.div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}