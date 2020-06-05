import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme/theme";
import configStore from "./configuration/configStore";
import config from "./config";

import "./App.scss";

const DashboardLazyLoading = React.lazy(() =>
  import("./tiles/container/dashboard")
);

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
            <Suspense fallback="Loading...">
              <DashboardLazyLoading />
            </Suspense>
          </SnackbarProvider>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
