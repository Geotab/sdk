import React from "react";
import ReactDOM from "react-dom/client";
import { MenuProvider } from "./menuContext";
import "./index.scss";
import './App.scss';
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MenuProvider>
      <App />
    </MenuProvider>
  </React.StrictMode>
);
