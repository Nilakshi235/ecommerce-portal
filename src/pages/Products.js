import { useEffect, useState } from 'react';
import { 
  Grid, Container, Typography, Button, 
  Box, Chip, TextField, IconButton,
  Card, CardContent, CardMedia, CardActions
} from '@mui/material';
import { 
  Search, FilterList, ShoppingCart, Favorite,
  FavoriteBorder, Star, StarHalf 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Noise cancelling wireless headphones with 30hr battery",
    price: 1999,
    mrp: 2999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "electronics"
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Fitness tracker with heart rate monitor and GPS",
    price: 2499,
    mrp: 3999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "electronics"
  },
  {
    id: 3,
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioned soles",
    price: 1299,
    mrp: 1999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    category: "fashion"
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    description: "100% cotton crew neck t-shirt",
    price: 399,
    mrp: 599,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dC1zaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "fashion"
  },
  {
    id: 5,
    name: "Backpack",
    description: "Water-resistant backpack with laptop compartment",
    price: 899,
    mrp: 1299,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhY2twYWNrfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    category: "accessories"
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Portable waterproof bluetooth speaker",
    price: 1499,
    mrp: 2299,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "electronics"
  },
  {
    id: 7,
    name: "Coffee Maker",
    description: "5-cup programmable coffee maker",
    price: 1799,
    mrp: 2499,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    category: "home"
  },
  {
    id: 8,
    name: "Yoga Mat",
    description: "Non-slip eco-friendly yoga mat",
    price: 599,
    mrp: 899,
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "fitness"
  },
  {
    id: 9,
    name: "Smartphone",
    description: "6.5\" display with 128GB storage",
    price: 15999,
    mrp: 19999,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "electronics"
  },
  {
    id: 10,
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness",
    price: 799,
    mrp: 1199,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVzayUyMGxhbXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    category: "home"
  },
  {
    id: 11,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with silent clicks",
    price: 499,
    mrp: 799,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    category: "electronics"
  },
  {
    id: 12,
    name: "Water Bottle",
    description: "Insulated stainless steel water bottle",
    price: 699,
    mrp: 999,
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    category: "accessories"
  }
];
    setProducts(sampleProducts);
  }, []);

  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        mb: 4,
        gap: 2
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #6C4DF6 30%, #FF7D7D 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Our Products
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          width: { xs: '100%', sm: 'auto' }
        }}>
          <TextField
            variant="outlined"
            placeholder="Search products..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'action.active' }} />,
              sx: { borderRadius: 2 }
            }}
            sx={{ 
              flexGrow: { xs: 1, sm: 0 },
              width: { sm: 300 }
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            Filters
          </Button>
        </Box>
      </Box>

      {/* Category Chips */}
      <Box sx={{ 
        display: 'flex', 
        gap: 1, 
        mb: 4,
        overflowX: 'auto',
        py: 1,
        '&::-webkit-scrollbar': { display: 'none' }
      }}>
        {categories.map(category => (
          <Chip
            key={category}
            label={category.charAt(0).toUpperCase() + category.slice(1)}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? 'filled' : 'outlined'}
            color={selectedCategory === category ? 'primary' : 'default'}
            sx={{ 
              px: 2,
              fontWeight: 600,
              borderRadius: 4
            }}
          />
        ))}
      </Box>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              component={motion.div}
              whileHover={{ y: -5, boxShadow: 3 }}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Discount Badge */}
              {product.mrp > product.price && (
                <Chip
                  label={`${Math.round((1 - product.price/product.mrp) * 100)}% OFF`}
                  color="error"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    fontWeight: 'bold',
                    zIndex: 1
                  }}
                />
              )}

              {/* Wishlist Button */}
              <IconButton 
                sx={{ 
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  zIndex: 1,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: 'error.main'
                  }
                }}
                onClick={() => toggleWishlist(product.id)}
              >
                {wishlist.includes(product.id) ? (
                  <Favorite color="error" />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>

              {/* Product Image */}
              <Box sx={{ 
                height: 200,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ 
                  fontWeight: 600,
                  height: '3em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ 
                  mb: 2,
                  height: '3em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {product.description}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Star sx={{ color: '#FFD700', fontSize: 18 }} />
                    <Star sx={{ color: '#FFD700', fontSize: 18 }} />
                    <Star sx={{ color: '#FFD700', fontSize: 18 }} />
                    <Star sx={{ color: '#FFD700', fontSize: 18 }} />
                    <StarHalf sx={{ color: '#FFD700', fontSize: 18 }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    (24 reviews)
                  </Typography>
                </Box>

                {/* Price */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    ₹{product.price}
                  </Typography>
                  {product.mrp > product.price && (
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      ₹{product.mrp}
                    </Typography>
                  )}
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={() => addToCart(product)}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #6C4DF6 0%, #9A7DFF 100%)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 16px rgba(108, 77, 246, 0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;