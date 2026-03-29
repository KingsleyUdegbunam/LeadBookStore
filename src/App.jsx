import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/shopPage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import { books } from "./data/inventory";
import OrderPage from "./Pages/OrderPage";

function App() {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const cartInDetail = cart.map((cartItem) => {
    const book = books.find((book) => book.id === cartItem.id);

    return { ...book, quantity: cartItem.quantity };
  });

  const cartTotalPrice = cart.reduce((total, cartItem) => {
    return cartItem.totalPrice + total;
  }, 0);

  const addToCart = (book) => {
    const inCart = cart.find((cartItem) => cartItem.id === book.id);

    if (inCart) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.basePrice * (item.quantity + 1),
              }
            : item,
        ),
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          id: book.id,
          quantity: 1,
          basePrice: book.price.paperback,
          totalPrice: book.price.paperback,
        },
      ]);
    }
  };

  const getShippingOptions = (state) => {
    const isAbuja = state === "FCT (Abuja)";

    return [
      {
        id: "DHL",
        desc: "2-5 Working Days",
        costInCents: isAbuja ? 1000000 : 1500000,
      },
      {
        id: "KOS",
        desc: "4-7 Working Days",
        costInCents: isAbuja ? 350000 : 650000,
      },
      {
        id: "Shipbubble",
        desc: "7-10 Working Days",
        costInCents: isAbuja ? 400000 : 650000,
      },
    ];
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage cart={cart} setCart={setCart} addToCart={addToCart} />
        }
      />
      <Route
        path="/shop"
        element={
          <ShopPage cart={cart} setCart={setCart} addToCart={addToCart} />
        }
      />

      <Route
        path="/cart"
        element={
          <CartPage
            cart={cart}
            setCart={setCart}
            cartInDetail={cartInDetail}
            cartTotalPrice={cartTotalPrice}
            getShippingOptions={getShippingOptions}
          />
        }
      />

      <Route
        path="/product/:id"
        element={<ProductPage cart={cart} addToCart={addToCart} />}
      />

      <Route
        path="/checkout"
        element={
          <CheckoutPage
            cart={cart}
            cartInDetail={cartInDetail}
            cartTotalPrice={cartTotalPrice}
            getShippingOptions={getShippingOptions}
          />
        }
      />

      <Route path="/order" element={<OrderPage cart={cart} />} />
    </Routes>
  );
}

export default App;
