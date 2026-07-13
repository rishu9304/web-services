import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
