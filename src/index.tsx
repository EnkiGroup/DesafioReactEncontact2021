import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { mirageDatabase } from './database'

mirageDatabase()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
