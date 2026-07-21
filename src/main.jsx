import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      richColors
      duration={3000}
      toastOptions={{
        style: {
          borderRadius: "0px",
          shadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
        },
      }}
    />
  </StrictMode>,
);
