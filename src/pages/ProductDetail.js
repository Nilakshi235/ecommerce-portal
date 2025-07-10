import { useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  
  // In a real app, you would fetch product details based on ID
  return (
    <Container>
      <Typography variant="h4">Product Details for ID: {id}</Typography>
      <Button 
        variant="contained" 
        onClick={() => addToCart({ id, name: `Product ${id}`, price: 100 })}
      >
        Add to Cart
      </Button>
    </Container>
  );
};

export default ProductDetail;