import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { deepPurple, pink, teal, amber, grey } from '@mui/material/colors';
import AnimatedRoutes from './components/AnimatedRoutes';
import { CartContext } from './contexts/CartContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6C4DF6',
      light: '#9A7DFF',
      dark: '#4A36B2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF7D7D',
      light: '#FFA3A3',
      dark: '#E05C5C',
      contrastText: '#FFFFFF',
    },
    success: {
      main: teal[500],
      light: teal[300],
      dark: teal[700],
    },
    warning: {
      main: amber[600],
      light: amber[400],
      dark: amber[800],
    },
    background: {
      default: '#F8F9FF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748',
      secondary: '#718096',
      disabled: grey[400],
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6C4DF6 0%, #9A7DFF 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    try {
      if (!product || !product.id) {
        console.error('Invalid product added to cart');
        return;
      }

      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        const quantityChange = product.quantity || 1;

        if (existingItem) {
          const newQuantity = existingItem.quantity + quantityChange;
          if (newQuantity <= 0) {
            return prevItems.filter(item => item.id !== product.id);
          }
          return prevItems.map(item =>
            item.id === product.id 
              ? { ...item, quantity: newQuantity } 
              : item
          );
        }
        
        if (quantityChange > 0) {
          return [...prevItems, { 
            ...product, 
            quantity: quantityChange 
          }];
        }
        
        return prevItems;
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = (productId) => {
    try {
      if (productId === 'all') {
        setCartItems([]);
      } else if (productId) {
        setCartItems(prevItems => 
          prevItems.filter(item => item.id !== productId)
        );
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const cartTotal = useMemo(() => {
    try {
      return Array.isArray(cartItems) 
        ? cartItems.reduce(
            (sum, item) => sum + ((item?.price || 0) * (item?.quantity || 0)), 
            0
          )
        : 0;
    } catch (error) {
      console.error('Error calculating cart total:', error);
      return 0;
    }
  }, [cartItems]);

  const cartCount = useMemo(() => {
    try {
      return Array.isArray(cartItems) 
        ? cartItems.reduce((sum, item) => sum + (item?.quantity || 0), 0) 
        : 0;
    } catch (error) {
      console.error('Error calculating cart count:', error);
      return 0;
    }
  }, [cartItems]);

  const cartContextValue = useMemo(() => ({
    cartItems: Array.isArray(cartItems) ? cartItems : [],
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
  }), [cartItems, cartTotal, cartCount]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartContext.Provider value={cartContextValue}>
        <Router>
          <AnimatedRoutes />
        </Router>
      </CartContext.Provider>
    </ThemeProvider>
  );
}

export default App;