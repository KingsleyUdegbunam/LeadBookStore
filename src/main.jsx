import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import "./styles/variables.css";
import "./styles/buttons.css";
import "./styles/forms.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      richColors
      duration={3000}
      toastOptions={{
        className: "custom-toast",
        actionButtonStyle: {
          background: "var(--color-brand)",
          color: "var(--button-primary-text)",
          border: "none",
          borderRadius: "8px",
          padding: "0.5rem 1.5rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background-color 0.2s ease",
        },
      }}
    />
  </StrictMode>,
);
