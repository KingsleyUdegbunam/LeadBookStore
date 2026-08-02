import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CartProvider } from "./context/CartContext";
import { UIProvider } from "./context/UIContext";
import { AuthContextProvider } from "./context/AuthContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";

function App() {
  return (
    <>
      <AuthContextProvider>
        <CartProvider>
          <UIProvider>
            <TooltipProvider>
              <RouterProvider router={router} />
            </TooltipProvider>
          </UIProvider>
        </CartProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
