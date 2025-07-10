import { 
  Box, Typography, Paper, Button, IconButton, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Divider, Chip, Grid, TextField
} from '@mui/material';
import { 
  Delete, Add, Remove, ShoppingCart, 
  ArrowForward, LocalOffer 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ShoppingCart color="primary" sx={{ fontSize: 32, mr: 2 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Your Shopping Cart
        </Typography>
        <Chip 
          label={`${cartItems.length} items`} 
          color="primary" 
          variant="outlined"
          sx={{ ml: 2 }}
        />
      </Box>

      {cartItems.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Start shopping to add items to your cart
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            href="/products"
            endIcon={<ArrowForward />}
          >
            Browse Products
          </Button>
        </Paper>
      ) : (
        <>
          <TableContainer 
            component={Paper} 
            elevation={3}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: 'primary.light' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow 
                    key={item.id}
                    component={motion.tr}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    hover
                  >
                    <TableCell>
                      <Typography fontWeight="medium">{item.name}</Typography>
                      {item.color && (
                        <Chip 
                          label={item.color} 
                          size="small" 
                          sx={{ mt: 1 }}
                        />
                      )}
                    </TableCell>
                    <TableCell>₹{item.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton 
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>₹{(item.price * item.quantity).toLocaleString()}</TableCell>
                    <TableCell>
                      <IconButton 
                        onClick={() => removeFromCart(item.id)}
                        color="error"
                        component={motion.div}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalOffer sx={{ mr: 1 }} /> Apply Coupon
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    fullWidth
                    placeholder="Enter coupon code"
                    variant="outlined"
                    size="small"
                  />
                  <Button variant="outlined">Apply</Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>₹{subtotal.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Shipping:</Typography>
                    <Typography>
                      {shipping === 0 ? (
                        <span style={{ color: 'green' }}>FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Tax (10%):</Typography>
                    <Typography>₹{tax.toLocaleString()}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" fontWeight="bold">Total:</Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      ₹{total.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForward />}
                  component={motion.div}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Proceed to Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Cart;