import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import useProducts, { Product } from "../hooks/useProducts";
import { formatPrice } from "../../utils";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

function ProductGrid({ shoppingCart, addToShoppingCart }) {
  const products: Product[] = useProducts();

  const handleProductLabel = (product: Product) => {
    const productInShoppingCart = shoppingCart?.items?.find(
      (item) => item.product.id === product.id
    );

    return productInShoppingCart
      ? `${productInShoppingCart.quantity} x`
      : "Ajouter au panier";
  };

  return (
    <Grid container marginTop={5}>
      {products?.map((product: Product) => (
        <Grid item key={product.id} xs={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Stack direction="column" spacing={2}>
              <Box
                component="img"
                sx={{ width: "100%", height: "auto" }}
                src={`/images/products/${product.imageName}`}
                alt={product.name}
              />

              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" color="secondary">
                  {formatPrice(product.price)}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                color="primary"
                endIcon={<ShoppingBasketIcon />}
                onClick={() => addToShoppingCart(product)}
              >
                {handleProductLabel(product)}
              </Button>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGrid;
