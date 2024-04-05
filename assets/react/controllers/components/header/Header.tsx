import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material";
import Link from "@mui/material/Link";
import { theme } from "../../theme";
import { visit } from "../../../../utils";

import { ShoppingCartItem } from "../../../hooks/useShoppingCart";
import {
  StyledRoot,
  StyledTitle,
  StyledDesktopContainer,
  StyledMobileContainer,
} from "./headerStyles";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#f3f5fb",
  padding: "0 2px",
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  position: "relative",
  "&:hover": {
    backgroundColor: "#2196F3",
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const pages = [
  { name: "Galerie", url: "/gallery" },
  { name: "Contactez-nous", url: "/contact" },
];

function Header({ shoppingCart }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigateToPage = (path: string): void => {
    visit(path);
  };

  const showsShoppingCart = () => {
    visit("/shopping-cart");
  };

  const calculateTotalQuantity = () => {
    return shoppingCart?.items
      ?.map((item: ShoppingCartItem) => item.quantity)
      .reduce((prev: number, curr: number) => prev + curr, 0);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMenu = () => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const renderMobileMenu = () => {
    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit" onClick={showsShoppingCart}>
            <Badge badgeContent={calculateTotalQuantity()} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  };

  return (
    <StyledRoot>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>

          <IconButton onClick={() => navigateToPage("/")} color="inherit">
            <StyledTitle variant="h6" noWrap>
              Cuisine Cloud
            </StyledTitle>
          </IconButton>

          <Search>
            <InputBase placeholder="search ..." />
          </Search>

          <StyledDesktopContainer>
            {pages.map((page, index) => (
              <Link
                key={index}
                style={{
                  padding: "6px 4px",
                  color: "white",
                  textDecoration: "none",
                }}
                onClick={() => navigateToPage(page.url)}
              >
                {page.name}
              </Link>
            ))}

            <IconButton color="inherit" onClick={showsShoppingCart}>
              <Badge badgeContent={calculateTotalQuantity()} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-owns={isMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </StyledDesktopContainer>
          <StyledMobileContainer>
            <IconButton
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </StyledMobileContainer>
        </Toolbar>
      </AppBar>
      {renderMenu()}
      {renderMobileMenu()}
    </StyledRoot>
  );
}

export default Header;
