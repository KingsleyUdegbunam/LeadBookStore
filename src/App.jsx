import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AccountDrawer } from "./feature/account/AccountDrawer";
import { Header } from "./component/Header/Header";
import { Footer } from "./component/Footer";
import HomePage from "./Pages/home/HomePage";
import ShopPage from "./Pages/shop/ShopPage";
import ProductPage from "./Pages/product/ProductPage";
import CartPage from "./Pages/cart/CartPage";
import CheckoutPage from "./Pages/checkout/CheckoutPage";
import OrderPage from "./Pages/order/OrderPage";
import AboutPage from "./Pages/about/AboutPage";
import ContactPage from "./Pages/contact/ContactPage";
import TrackingPage from "./Pages/tracking/TrackingPage";
import OrderStatusPage from "./Pages/orderStatus/OrderStatusPage";
import { books } from "./data/inventory";

function App() {
  const [openAccountDrawer, setOpenAccountDrawer] = useState(false);
  const [cart, setCart] = useState([]);

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

  return (
    <>
      <AccountDrawer
        isOpen={openAccountDrawer}
        onClose={() => setOpenAccountDrawer(false)}
      />
      <Header cart={cart} setOpenAccountDrawer={setOpenAccountDrawer} />
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
            />
          }
        />

        <Route path="/order/:id" element={<OrderPage cart={cart} />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/contact" element={<ContactPage />} />

        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/orderStatus/:id" element={<OrderStatusPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
