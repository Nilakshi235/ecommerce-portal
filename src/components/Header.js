import { AppBar, Toolbar, Typography, Button, Badge, Box, IconButton } from '@mui/material';
import { ShoppingCart, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = ({ cartCount }) => {
  return (
    <AppBar 
      position="sticky"
      elevation={1}
      sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        color: 'text.primary',
      }}
    >
      <Toolbar>
        {/* Brand Logo/Name */}
        <Typography
          variant="h6"
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            '& a': {
              background: 'linear-gradient(45deg, #1976d2 30%, #dc004e 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }
          }}
        >
          <Link to="/">
            E-Commerce Portal
          </Link>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          <Button 
            component={Link}
            to="/products"
            color="inherit"
            sx={{
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)'
              }
            }}
          >
            Products
          </Button>
          <Button 
            component={Link}
            to="/pos"
            color="inherit"
            sx={{
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)'
              }
            }}
          >
            POS
          </Button>
        </Box>

        {/* Shopping Cart */}
        <Button 
          component={Link}
          to="/cart"
          color="inherit"
          sx={{ 
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)'
            }
          }}
        >
          <Badge 
            badgeContent={cartCount} 
            color="secondary"
            sx={{
              '& .MuiBadge-badge': {
                right: -3,
                top: 8,
                border: '2px solid #fff',
                fontWeight: 'bold',
              },
            }}
          >
            <ShoppingCart />
          </Badge>
        </Button>

        {/* Mobile Menu Button (hidden on desktop) */}
        <IconButton
          color="inherit"
          edge="end"
          sx={{ display: { xs: 'block', sm: 'none' }, ml: 1 }}
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;