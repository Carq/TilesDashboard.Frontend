import React from "react";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import Dashboard from "./tiles/container/dashboard";
import theme from "./Theme/theme";
import rootReducer from "./rootReducer";

import "./App.css";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <SnackbarProvider>
            <Dashboard />
          </SnackbarProvider>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
