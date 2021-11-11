import { createTheme, adaptV4Theme } from "@mui/material/styles";

const theme = createTheme(adaptV4Theme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6decb9",
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em",
      },
    },
  },
}));

export default theme;
