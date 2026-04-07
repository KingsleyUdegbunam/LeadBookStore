import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "./component/Header/Header";
import { Footer } from "./component/Footer";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/shopPage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderPage from "./Pages/OrderPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import TrackingPage from "./Pages/TrackingPage";
import OrderStatusPage from "./Pages/OrderStatusPage";
import { books } from "./data/inventory";
import dayjs from "dayjs";

function App() {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const today = dayjs();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const cartInDetail = cart.map((cartItem) => {
    const book = books.find((book) => book.id === cartItem.id);

    return {
      ...book,
      quantity: cartItem.quantity,
      totalPrice: cartItem.totalPrice,
    };
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
        minDeliveryDay: today.add(2, "day").format("MMM DD YYYY"),
        maxDeliveryDay: today.add(5, "day").format("MMM DD YYYY"),
        costInCents: isAbuja ? 1000000 : 1500000,
      },
      {
        id: "KOS",
        desc: "4-7 Working Days",
        minDeliveryDay: today.add(4, "day").format("MMM DD YYYY"),
        maxDeliveryDay: today.add(7, "day").format("MMM DD YYYY"),
        costInCents: isAbuja ? 550000 : 650000,
      },
      {
        id: "Shipbubble",
        desc: "7-10 Working Days",
        minDeliveryDay: today.add(7, "day").format("MMM DD YYYY"),
        maxDeliveryDay: today.add(10, "day").format("MMM DD YYYY"),
        costInCents: isAbuja ? 350000 : 450000,
      },
    ];
  };

  return (
    <>
      <Header cart={cart} />
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
              setCart={setCart}
              cartInDetail={cartInDetail}
              cartTotalPrice={cartTotalPrice}
              getShippingOptions={getShippingOptions}
            />
          }
        />

        <Route path="/order/:id" element={<OrderPage cart={cart} />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/contact" element={<ContactPage />} />

        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/orderStatus" element={<OrderStatusPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
