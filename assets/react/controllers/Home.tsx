import React from "react";
import Header from "./components/header/Header";
import ProductGrid from "./ProductGrid";
import useShoppingCart from "../hooks/useShoppingCart";
import { Box } from "@mui/material";

function Home() {
  const { addToShoppingCart, shoppingCart } = useShoppingCart();
  debugger;
  return (
    <>
      <Box style={{ margin: 0 }}>
        <Header shoppingCart={shoppingCart} />
      </Box>
      <ProductGrid
        shoppingCart={shoppingCart}
        addToShoppingCart={addToShoppingCart}
      />
    </>
  );
}

export default Home;
