import { useState } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import {
  Edit,
  Delete,
  MoreVert,
  Email,
  Person
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import EditUserForm from './EditUserForm';

function UserCard({ user, onUserUpdated, onUserDeleted }) {
  const [editOpen, setEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated } = useAuth();
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    handleMenuClose();
    if (!window.confirm(`Delete ${user.first_name} ${user.last_name}?`)) return;
    
    try {
      setIsDeleting(true);
      await onUserDeleted(user.id);
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    handleMenuClose();
    setEditOpen(true);
  };

  const handleUpdateSuccess = (updatedUser) => {
    setEditOpen(false);
    onUserUpdated(updatedUser);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Card 
          sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6
            }
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <CardHeader
            avatar={
              <Avatar 
                src={user.avatar} 
                alt={`${user.first_name} ${user.last_name}`}
                sx={{ 
                  width: 56, 
                  height: 56,
                  border: '2px solid white',
                  boxShadow: 3
                }}
              >
                <Person fontSize="large" />
              </Avatar>
            }
            action={
              isAuthenticated && (
                <IconButton 
                  aria-label="settings"
                  onClick={handleMenuOpen}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <MoreVert />
                </IconButton>
              )
            }
            title={
              <Typography variant="h6" component="div">
                {`${user.first_name} ${user.last_name}`}
              </Typography>
            }
            subheader={
              <Chip 
                label={`ID: ${user.id}`}
                size="small"
                sx={{ 
                  mt: 1,
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText'
                }}
              />
            }
          />

          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </CardContent>

          {isAuthenticated && (
            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<Edit />}
                onClick={handleEdit}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500
                }}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={
                  isDeleting ? (
                    <CircularProgress size={16} />
                  ) : (
                    <Delete />
                  )
                }
                onClick={handleDelete}
                disabled={isDeleting}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500
                }}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </CardActions>
          )}

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: 'visible',
                mt: 1,
                minWidth: 180,
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
          >
            <MenuItem onClick={handleEdit}>
              <Edit fontSize="small" sx={{ mr: 1.5 }} /> Edit
            </MenuItem>
            <Divider />
            <MenuItem 
              onClick={handleDelete} 
              disabled={isDeleting}
              sx={{ color: 'error.main' }}
            >
              {isDeleting ? (
                <CircularProgress size={20} sx={{ mr: 1.5 }} />
              ) : (
                <Delete fontSize="small" sx={{ mr: 1.5 }} />
              )}
              Delete
            </MenuItem>
          </Menu>
        </Card>
      </motion.div>

      <EditUserForm
        user={user}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onUpdate={handleUpdateSuccess}
      />
    </>
  );
}

export default UserCard;