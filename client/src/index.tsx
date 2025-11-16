import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root") as HTMLElement | null;
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
