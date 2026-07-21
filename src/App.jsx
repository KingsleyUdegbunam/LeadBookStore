import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CartProvider } from "./context/CartContext";
import { UIProvider } from "./context/UIContext";

function App() {
  return (
    <>
      <CartProvider>
        <UIProvider>
          <RouterProvider router={router} />
        </UIProvider>
      </CartProvider>
    </>
  );
}

export default App;
