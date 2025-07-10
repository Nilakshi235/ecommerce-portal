// src/components/ProductImage.js
import { useState } from 'react';
import { Box } from '@mui/material';

const ProductImage = ({ src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setImgSrc('https://via.placeholder.com/300x200?text=Product+Image');
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <Box sx={{ position: 'relative', paddingTop: '100%' }}>
      {loading && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          Loading...
        </Box>
      )}
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: loading ? 'none' : 'block'
        }}
        {...props}
      />
    </Box>
  );
};

export default ProductImage;