import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CartProvider } from "./context/CartContext";
import { UIProvider } from "./context/UIContext";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <CartProvider>
          <UIProvider>
            <RouterProvider router={router} />
          </UIProvider>
        </CartProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
