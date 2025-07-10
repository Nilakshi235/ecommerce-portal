import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from './Cart';
import POS from './POS';
import ProductDetail from '../pages/ProductDetail';
import { CartContext } from '../contexts/CartContext';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100
    }
  },
  out: {
    opacity: 0,
    y: -50,
    transition: {
      ease: 'easeInOut'
    }
  }
};

export default function AnimatedRoutes() {
  const location = useLocation();
  const { cartItems = [], addToCart, removeFromCart } = useContext(CartContext);

  // Calculate cart count safely
  const cartCount = cartItems.reduce((sum, item) => sum + (item?.quantity || 0), 0);

  return (
    <>
      <Header cartCount={cartCount} />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname.split('/')[1] || 'home'}>
          <Route 
            path="/" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <Home />
              </motion.div>
            } 
          />
          <Route 
            path="/products" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <Products addToCart={addToCart} />
              </motion.div>
            } 
          />
          <Route 
            path="/products/:id" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductDetail addToCart={addToCart} />
              </motion.div>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Cart 
                  cartItems={cartItems} 
                  removeFromCart={removeFromCart} 
                />
              </motion.div>
            } 
          />
          <Route 
            path="/pos" 
            element={
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <POS 
                  addToCart={addToCart} 
                  cartItems={cartItems} 
                  removeFromCart={removeFromCart}
                />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}