import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, deleteUser } from '../../services/api';
import { 
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import UserCard from './UserCard';

export default function UsersList() {
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ['users', page],
    () => getUsers(page),
    { keepPreviousData: true }
  );

  const mutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users', page]);
      setSnackbar({ open: true, message: 'User deleted successfully' });
    },
    onError: () => {
      setSnackbar({ open: true, message: 'Error deleting user' });
    }
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) return (
    <Container sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
      <CircularProgress />
    </Container>
  );

  if (isError) return (
    <Container sx={{ py: 4 }}>
      <Alert severity="error">Error loading users</Alert>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        User Directory
      </Typography>
      
      <Grid container spacing={3}>
        {data.data.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard 
              user={user} 
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({...snackbar, open: false})}
        message={snackbar.message}
      />
    </Container>
  );
}