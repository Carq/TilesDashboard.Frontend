import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ThemeProvider } from "@material-ui/core/styles";
import Dashboard from "./tiles/container/dashboard";
import theme from "./Theme/theme";
import rootReducer from "./rootReducer";

import "./App.css";

const store = createStore(rootReducer);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Dashboard />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
