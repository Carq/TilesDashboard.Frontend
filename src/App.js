import React from "react";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import Dashboard from "./tiles/container/dashboard";
import theme from "./Theme/theme";
import rootReducer from "./rootReducer";

import "./App.scss";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

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
