import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root") as HTMLElement | null;
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {/* 3. Envolva o App com o Provider */}
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
