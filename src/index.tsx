import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { Providers } from "./app/providers";
import { makeServer } from "./server";
import "./index.css";

makeServer();

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
