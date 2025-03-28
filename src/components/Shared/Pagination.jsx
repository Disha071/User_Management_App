import { 
  Pagination as MuiPagination,
  PaginationItem,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@mui/icons-material';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      alignItems="center" 
      justifyContent="center"
      sx={{ 
        py: 4,
        width: '100%',
        flexWrap: 'wrap'
      }}
    >
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Page {currentPage} of {totalPages}
      </Typography>
      
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        size={isSmallScreen ? 'small' : 'medium'}
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: KeyboardArrowLeft,
              next: KeyboardArrowRight,
              first: KeyboardDoubleArrowLeft,
              last: KeyboardDoubleArrowRight,
            }}
            {...item}
            sx={{
              fontWeight: item.type === 'page' ? 600 : 400,
              minWidth: 32,
              height: 32,
              '&.Mui-selected': {
                boxShadow: theme.shadows[2],
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              },
              '&.Mui-disabled': {
                opacity: 0.5
              }
            }}
          />
        )}
        sx={{
          '& .MuiPagination-ul': {
            flexWrap: 'nowrap'
          }
        }}
      />
    </Stack>
  );
}

export default Pagination;