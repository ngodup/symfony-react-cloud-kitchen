import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const StyledRoot = styled("div")(({ theme }) => ({
  width: "100%",
  margin: 0,
  marginBottom: "10px",
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  // Custom styles here
  display: "none", // This is an example; customize as needed
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

export const StyledTabContainer = styled("div")({
  marginLeft: "auto",
});

export const StyledDesktopContainer = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export const StyledMobileContainer = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));
