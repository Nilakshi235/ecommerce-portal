import React from 'react';
import { Box, Typography, Button, Grid, Container, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Stylish woman image for fashion e-commerce (similar to your reference)
const heroImage = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80';

const Home = () => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Fashion Hero Section with Stylish Woman */}
      <Box sx={{ backgroundColor: '#f9f5ff', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: 'center', py: 4 }}>
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2
                  }}
                >
                  Discover Your Perfect Style
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    color: 'text.secondary'
                  }}
                >
                  Curated collection of premium fashion 
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button 
                    component={Link} 
                    to="/products" 
                    variant="contained" 
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      background: 'linear-gradient(45deg, #6C4DF6 0%, #9A7DFF 100%)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 16px rgba(108, 77, 246, 0.3)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Shop Now
                  </Button>
                  
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              >
                <Box
                  component="img"
                  src={heroImage}
                  alt="Stylish woman fashion model"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Category Highlights */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            textAlign: 'center',
            mb: 8,
            fontWeight: 700
          }}
        >
          Shop by Category
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              name: 'Dresses',
              image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              link: '/category/dresses'
            },
            {
              name: 'Accessories',
              image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              link: '/category/accessories'
            },
            {
              name: 'Footwear',
              image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              link: '/category/footwear'
            }
          ].map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div whileHover={{ y: -10 }}>
                <Button 
                  component={Link} 
                  to={category.link} 
                  sx={{ 
                    p: 0, 
                    height: '100%',
                    width: '100%',
                    textAlign: 'left',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={category.image}
                      alt={category.name}
                      sx={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        filter: 'brightness(0.9)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          filter: 'brightness(1)'
                        }
                      }}
                    />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 4,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
                    }}>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          color: 'white',
                          fontWeight: 600,
                          textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                        }}
                      >
                        {category.name}
                      </Typography>
                    </Box>
                  </Box>
                </Button>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      

      {/* Newsletter */}
      <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h3" 
          sx={{ 
            mb: 3,
            fontWeight: 700
          }}
        >
          Join Our Fashion Community
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 5,
            color: 'text.secondary'
          }}
        >
          Get 10% off your first order and exclusive style tips
        </Typography>
        <Box 
          component="form"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          <input
            type="email"
            placeholder="Your email address"
            style={{
              padding: '16px 20px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              flexGrow: 1,
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              '&:focus': {
                borderColor: '#6C4DF6',
                boxShadow: '0 0 0 2px rgba(108, 77, 246, 0.2)'
              }
            }}
          />
          <Button 
            type="submit"
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1rem',
              background: 'linear-gradient(45deg, #6C4DF6 0%, #9A7DFF 100%)',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;