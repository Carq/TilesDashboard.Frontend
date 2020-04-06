import React from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import Dashboard from "./tiles/container/dashboard";
import theme from "./Theme/theme";
import configStore from "./configuration/configStore";
import config from "./config";

import "./App.scss";

const store = configStore();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Helmet>
            <title>{config.dashboard.name || "Tiles Dashboard"}</title>
          </Helmet>
          <SnackbarProvider>
            <Dashboard />
          </SnackbarProvider>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
