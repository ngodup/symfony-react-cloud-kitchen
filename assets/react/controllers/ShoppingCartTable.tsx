import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

import { ShoppingCartItem } from "../hooks/useShoppingCart";

function ShoppingCartTable({ shoppingCart, removeFromShoppingCart }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Produit</TableCell>
            <TableCell>Quqntite</TableCell>
            <TableCell>Prix</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shoppingCart?.items.map((item: ShoppingCartItem) => (
            <TableRow key={item.product.id}>
              <TableCell>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <img
                    style={{ marginRight: "10px" }} // Adjust spacing as needed
                    width={100}
                    height={100}
                    src={`/images/products/${item.product.imageName}`}
                    alt={item.product.name}
                  />
                  <span>{item.product.name}</span>
                </Box>
              </TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.product.price}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => removeFromShoppingCart(item.product)}
                >
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ShoppingCartTable;
