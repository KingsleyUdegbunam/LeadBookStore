import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
      <Route
        path="/shop"
        element={<ProductPage cart={cart} setCart={setCart} />}
      />
      <Route
        path="/cart"
        element={<CartPage cart={cart} setCart={setCart} />}
      />
    </Routes>
  );
}

export default App;
