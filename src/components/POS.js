import React, { useState, useEffect } from 'react';
import { 
  Box, Grid, TextField, Button, Typography, 
  Paper, Divider, IconButton, Badge, Select, MenuItem,
  InputAdornment, Chip, Alert, Snackbar, Avatar,
  Card, CardMedia, CardContent  // Added Card components
} from '@mui/material';
import { 
  Search, Add, Remove, Delete, 
  Print, Close, LocalAtm, CreditCard, 
  PhoneAndroid, Inventory, Person, 
  Discount, Receipt, ClearAll
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const POS = ({ addToCart, cartItems, removeFromCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customer, setCustomer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discount, setDiscount] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const allProducts = [
      { id: 1, name: "Wireless Headphones", price: 1999, stock: 15, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
      { id: 2, name: "Smart Watch", price: 2499, stock: 8, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
      { id: 3, name: "Running Shoes", price: 1299, stock: 12, category: "fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" },
      { id: 4, name: "Cotton T-Shirt", price: 399, stock: 25, category: "fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dC1zaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
      { id: 5, name: "Backpack", price: 899, stock: 10, category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhY2twYWNrfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" },
      { id: 6, name: "Bluetooth Speaker", price: 1499, stock: 7, category: "electronics", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
      { id: 7, name: "Coffee Maker", price: 1799, stock: 5, category: "home", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
      { id: 8, name: "Yoga Mat", price: 599, stock: 9, category: "fitness", image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
      { id: 9, name: "Smartphone", price: 15999, stock: 6, category: "electronics", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
      { id: 10, name: "Desk Lamp", price: 799, stock: 11, category: "home", image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVzayUyMGxhbXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
      { id: 11, name: "Wireless Mouse", price: 499, stock: 14, category: "electronics", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" },
      { id: 12, name: "Water Bottle", price: 699, stock: 18, category: "accessories", image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" }
    ];
    setProducts(allProducts);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + tax - discountAmount;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCompleteSale = () => {
    if (cartItems.length === 0) {
      showSnackbar('Please add items to cart before completing sale', 'error');
      return;
    }

    showSnackbar(`Sale completed for ₹${total.toFixed(2)}! Thank you ${customer || 'valued customer'}!`, 'success');
    const receipt = {
      customer,
      items: cartItems,
      subtotal,
      tax,
      discount: discountAmount,
      total,
      paymentMethod,
      date: new Date().toLocaleString()
    };
    console.log('Receipt:', receipt);
    removeFromCart('all');
    setCustomer('');
    setDiscount(0);
    setPaymentMethod('cash');
  };

  const handlePrintReceipt = () => {
    if (cartItems.length === 0) {
      showSnackbar('No items in cart to print receipt', 'error');
      return;
    }
    const receipt = {
      customer,
      items: cartItems,
      subtotal,
      tax,
      discount: discountAmount,
      total,
      paymentMethod,
      date: new Date().toLocaleString()
    };
    console.log('Receipt:', receipt);
    showSnackbar('Receipt printed to console', 'info');
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const categories = ['all', 'electronics', 'fashion', 'home', 'accessories', 'fitness'];

  return (
    <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        p: 2,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 1
      }}>
        <Inventory sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Point of Sale System
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Product Selection Panel (Left) */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ 
            p: 2, 
            height: '75vh', 
            overflow: 'auto',
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 1
          }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mb: 3,
              alignItems: 'center'
            }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 1 }
                }}
                size="small"
              />
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{ 
                  minWidth: 150,
                  borderRadius: 1,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider'
                  }
                }}
                size="small"
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {filteredProducts.length === 0 ? (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '60%',
                flexDirection: 'column'
              }}>
                <Typography variant="h6" color="text.secondary">
                  No products found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try changing your search or category filter
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {filteredProducts.map(product => {
                  const inCart = cartItems.find(item => item.id === product.id);
                  const cartQuantity = inCart ? inCart.quantity : 0;
                  const remainingStock = product.stock - cartQuantity;
                  
                  return (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <Card 
                        component={motion.div}
                        whileHover={{ y: -5 }}
                        sx={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 2,
                          overflow: 'hidden',
                          position: 'relative',
                          boxShadow: 1,
                          border: '1px solid',
                          borderColor: 'divider',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          if (remainingStock > 0) {
                            addToCart(product);
                          }
                        }}
                      >
                        <Box sx={{ 
                          height: 140,
                          position: 'relative',
                          overflow: 'hidden'
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
                          {remainingStock <= 0 && (
                            <Box sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Typography variant="body2" color="white" fontWeight="bold">
                                OUT OF STOCK
                              </Typography>
                            </Box>
                          )}
                        </Box>

                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box sx={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 1
                          }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {product.name}
                            </Typography>
                            {cartQuantity > 0 && (
                              <Chip 
                                label={cartQuantity} 
                                color="primary" 
                                size="small"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {product.category}
                          </Typography>
                          
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                            ₹{product.price.toLocaleString()}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography 
                              variant="caption" 
                              color={remainingStock < 3 ? 'error' : 'text.secondary'}
                              sx={{ fontWeight: remainingStock < 3 ? 'bold' : 'normal' }}
                            >
                              Stock: {remainingStock}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Paper>
        </Grid>

        {/* Order Summary Panel (Right) */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ 
            p: 2, 
            height: '75vh', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 1
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold',
              mb: 2,
              display: 'flex',
              alignItems: 'center'
            }}>
              <Receipt sx={{ mr: 1, color: 'primary.main' }} />
              Order Summary
              {cartItems.length > 0 && (
                <Chip 
                  label={`${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`} 
                  color="primary" 
                  size="small" 
                  sx={{ ml: 'auto' }}
                />
              )}
            </Typography>
            
            {/* Customer Info */}
            <TextField
              label="Customer Name"
              variant="outlined"
              size="small"
              fullWidth
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 1 }
              }}
              sx={{ mb: 2 }}
            />

            {/* Cart Items */}
            <Box sx={{ 
              flexGrow: 1, 
              overflow: 'auto', 
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 1
            }}>
              {cartItems.length === 0 ? (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '100%',
                  flexDirection: 'column',
                  textAlign: 'center'
                }}>
                  <Inventory sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    No items added yet
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Search and select products to add to cart
                  </Typography>
                </Box>
              ) : (
                cartItems.map(item => {
                  const product = products.find(p => p.id === item.id);
                  const remainingStock = product ? product.stock - item.quantity : 0;
                  
                  return (
                    <Paper 
                      key={item.id} 
                      sx={{ 
                        p: 1.5, 
                        mb: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Avatar 
                        src={product?.image}
                        variant="rounded"
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <IconButton 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart({...item, quantity: -1});
                            }}
                            disabled={item.quantity <= 1}
                            sx={{ color: 'text.secondary' }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography variant="body2" sx={{ mx: 1 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item);
                            }}
                            disabled={remainingStock <= 0}
                            sx={{ color: 'text.secondary' }}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ ml: 'auto', fontWeight: 700 }}
                          >
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </Typography>
                        </Box>
                        {remainingStock < 3 && remainingStock > 0 && (
                          <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
                            Only {remainingStock} left in stock
                          </Typography>
                        )}
                      </Box>
                      <IconButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item.id);
                        }}
                        sx={{ ml: 1, color: 'error.main' }}
                      >
                        <Delete />
                      </IconButton>
                    </Paper>
                  );
                })
              )}
            </Box>

            {/* Order Totals */}
            <Divider sx={{ my: 1 }} />
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2">Subtotal:</Typography>
                <Typography variant="body2">₹{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2">Tax (10%):</Typography>
                <Typography variant="body2">₹{tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2">Discount:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Select
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    size="small"
                    sx={{ 
                      width: 90, 
                      mr: 1,
                      borderRadius: 1,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'divider'
                      }
                    }}
                    startAdornment={
                      <InputAdornment position="start">
                        <Discount fontSize="small" color="primary" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value={0}>0%</MenuItem>
                    <MenuItem value={5}>5%</MenuItem>
                    <MenuItem value={10}>10%</MenuItem>
                    <MenuItem value={15}>15%</MenuItem>
                    <MenuItem value={20}>20%</MenuItem>
                  </Select>
                  <Typography variant="body2" color="error">
                    -₹{discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontWeight: 'bold',
                backgroundColor: 'primary.light',
                p: 1.5,
                borderRadius: 1
              }}>
                <Typography variant="subtitle1">Total:</Typography>
                <Typography variant="subtitle1">
                  ₹{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Typography>
              </Box>
            </Box>

            {/* Payment Method */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Payment Method
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant={paymentMethod === 'cash' ? 'contained' : 'outlined'}
                  startIcon={<LocalAtm />}
                  onClick={() => setPaymentMethod('cash')}
                  fullWidth
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: 1
                  }}
                >
                  Cash
                </Button>
                <Button
                  variant={paymentMethod === 'card' ? 'contained' : 'outlined'}
                  startIcon={<CreditCard />}
                  onClick={() => setPaymentMethod('card')}
                  fullWidth
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: 1
                  }}
                >
                  Card
                </Button>
                <Button
                  variant={paymentMethod === 'upi' ? 'contained' : 'outlined'}
                  startIcon={<PhoneAndroid />}
                  onClick={() => setPaymentMethod('upi')}
                  fullWidth
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: 1
                  }}
                >
                  UPI
                </Button>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
              disabled={cartItems.length === 0}
              sx={{ 
                mb: 1, 
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: 1,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: 'primary.dark'
                }
              }}
              onClick={handleCompleteSale}
            >
              Complete Sale (₹{total.toLocaleString(undefined, { minimumFractionDigits: 2 })})
            </Button>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                color="error" 
                fullWidth
                disabled={cartItems.length === 0}
                onClick={() => removeFromCart('all')}
                startIcon={<ClearAll />}
                sx={{ 
                  py: 1.5,
                  borderRadius: 1
                }}
              >
                Clear Order
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                fullWidth
                disabled={cartItems.length === 0}
                onClick={handlePrintReceipt}
                startIcon={<Print />}
                sx={{ 
                  py: 1.5,
                  borderRadius: 1
                }}
              >
                Receipt
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%', borderRadius: 1 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default POS;