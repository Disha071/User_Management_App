// src/pages/UsersPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Container,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
  Box,
  Alert,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material';
import { Search, FilterAlt } from '@mui/icons-material';
import { getUsers, updateUser, deleteUser } from '../services/api';
import UserCard from '../components/Users/UserCard';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    active: null, // true/false/null
    role: '' // 'admin', 'user', etc.
  });
  const { token } = useAuth();

  // Fetch users
  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getUsers(page);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        setError('Failed to load users. Please try again.');
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, token]);

  // Filter and search users
  useEffect(() => {
    const filtered = users.filter(user => {
      // Search term matching (name, email, etc.)
      const matchesSearch = 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter matching (add your custom filters here)
      const matchesFilters = 
        (filters.active === null || user.active === filters.active) &&
        (filters.role === '' || user.role === filters.role);

      return matchesSearch && matchesFilters;
    });
    setFilteredUsers(filtered);
  }, [users, searchTerm, filters]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setPage(1); // Reset to first page when filtering
  };

  const handleUserUpdate = async (updatedUser) => {
    try {
      setError('');
      const response = await updateUser(updatedUser.id, updatedUser);
      setUsers(users.map(user => 
        user.id === updatedUser.id ? response : user
      ));
    } catch (error) {
      setError('Failed to update user. Please try again.');
      console.error('Update failed:', error);
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      setError('');
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      setError('Failed to delete user. Please try again.');
      console.error('Delete failed:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        User Directory
      </Typography>

      {/* Search and Filter Bar */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 4,
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: { sm: '400px' },
            backgroundColor: 'background.paper'
          }}
        />

        {/* Filter Chips - Customize based on your user data */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <FilterAlt color="action" />
          <Chip
            label="All"
            clickable
            variant={filters.active === null ? 'filled' : 'outlined'}
            onClick={() => handleFilterChange('active', null)}
          />
          <Chip
            label="Active"
            clickable
            variant={filters.active === true ? 'filled' : 'outlined'}
            onClick={() => handleFilterChange('active', true)}
          />
          <Chip
            label="Inactive"
            clickable
            variant={filters.active === false ? 'filled' : 'outlined'}
            onClick={() => handleFilterChange('active', false)}
          />
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Results Count */}
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Showing {filteredUsers.length} of {users.length} users
      </Typography>

      {/* User Cards Grid */}
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard 
              user={user} 
              onUserUpdated={handleUserUpdate}
              onUserDeleted={handleUserDelete}
            />
          </Grid>
        ))}
      </Grid>

      {/* No Results Message */}
      {filteredUsers.length === 0 && !loading && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px'
        }}>
          <Typography variant="h6" color="text.secondary">
            No users found matching your criteria
          </Typography>
        </Box>
      )}

      {/* Pagination - Only show if we have results */}
      {filteredUsers.length > 0 && totalPages > 1 && (
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(_, value) => setPage(value)} 
          sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
          color="primary"
        />
      )}
    </Container>
  );
};

export default UsersPage;