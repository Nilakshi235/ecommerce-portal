import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';

const Product = ({ product, onAddToCart }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          ₹{product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          MRP: <s>₹{product.mrp}</s>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;