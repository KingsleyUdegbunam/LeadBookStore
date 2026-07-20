import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/home/HomePage";
import ShopPage from "./Pages/shop/ShopPage";
import CartPage from "./Pages/cart/CartPage";
import ProductPage from "./Pages/product/ProductPage";
import CheckoutPage from "./Pages/checkout/CheckoutPage";
import OrderPage from "./Pages/order/OrderPage";
import AboutPage from "./Pages/about/AboutPage";
import ContactPage from "./Pages/contact/ContactPage";
import TrackingPage from "./Pages/tracking/TrackingPage";
import SignInPage from "./Pages/auth/signin/SignInPage";
import SignUpPage from "./Pages/auth/signup/SignupPage";
import Layout from "./Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/order/:id", element: <OrderPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/tracking", element: <TrackingPage /> },
    ],
  },
]);
