import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, mt: 4 }}>
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} E-Commerce Portal
      </Typography>
    </Box>
  );
};

export default Footer;