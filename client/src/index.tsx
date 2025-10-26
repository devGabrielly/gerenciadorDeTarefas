import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* 3. Envolva o App com o Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
