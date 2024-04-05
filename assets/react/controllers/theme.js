import { createTheme } from "@mui/material/styles";

const white = "#ffffff";
const customBlue = "#2196F3";

export const theme = createTheme({
  palette: {
    common: {
      white: `${white}`,
      blue: `${customBlue}`,
    },
    // If you want to customize the primary color or any other color in your theme:
    primary: {
      main: "#007bff", // This sets the primary color to white
    },
    // You can add other color definitions here
  },
  // ... other theme options
});
