import React from "react";
import Header from "./components/header/Header";
import useShoppingCart from "../hooks/useShoppingCart";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ShoppingCartTable from "./ShoppingCartTable";
import LockIcon from "@mui/icons-material/Lock";

function ShoppingCart() {
  const { removeFromShoppingCart, shoppingCart } = useShoppingCart();

  const proceedToCheckout = () => {
    fetch("/stripe/checkout-sessions")
      .then((response) => response.json())
      .then((json) => (window.location.href = json["url"]));
  };

  return (
    <>
      <Header shoppingCart={shoppingCart} />
      <Container>
        <Box marginY={5}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h5">Mon panier</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LockIcon />}
                onClick={proceedToCheckout}
              >
                &nbsp;Procéder au paiement
              </Button>
            </Grid>
          </Grid>
        </Box>
        <ShoppingCartTable
          shoppingCart={shoppingCart}
          removeFromShoppingCart={removeFromShoppingCart}
        />
      </Container>
    </>
  );
}

export default ShoppingCart;
