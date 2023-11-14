import React from "react";
import "./App.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Main from "./Main";

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
