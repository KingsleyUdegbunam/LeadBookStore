import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/home/HomePage";
import ShopPage from "./Pages/shop/ShopPage";
import CartPage from "./Pages/cart/CartPage";
import ProductPage from "./Pages/product/ProductPage";
import CheckoutPage from "./Pages/checkout/CheckoutPage";
import PostCheckout from "./Pages/post-checkout/PostCheckout";
import AboutPage from "./Pages/about/AboutPage";
import ContactPage from "./Pages/contact/ContactPage";
import SignInPage from "./Pages/auth/signin/SignInPage";
import SignUpPage from "./Pages/auth/signup/SignUpPage";
import Layout from "./Layout";
import AuthLayout from "./AuthLayout";
import OrdersPage from "./Pages/account/authenticated/orders/OrdersPage";
import OrderDetail from "./Pages/account/authenticated/orderDetail/OrderDetail";
import { Settings } from "./Pages/account/authenticated/setting/Settings";
import { NotFound } from "./Pages/not-found/NotFound";
import { AuthGuard } from "./routes/AuthGuard";
import { TrackOrder } from "./Pages/account/guest/track-order/TrackOrder";
import { GuestOrder } from "./Pages/account/guest/track-order/GuestOrder";

export const router = createBrowserRouter([
  //Public pages
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      { path: "product/:id", element: <ProductPage /> },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "order/:ref", element: <PostCheckout /> },
      {
        path: "*",
        element: <NotFound />,
      },

      { path: "track-order", element: <TrackOrder /> },
      {
        path: "order-tracking/:ref",
        element: <GuestOrder />,
      },
    ],
  },
  // Authentication pages. Reducing visual distraction
  {
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: <SignUpPage />,
      },
      { path: "signin", element: <SignInPage /> },
    ],
  },

  // Authenticateed User
  {
    element: <AuthGuard />,

    children: [
      {
        element: <Layout />,
        path: "account",
        children: [
          {
            path: "settings",
            element: <Settings />,
          },
          { path: "orders", element: <OrdersPage /> },
          { path: "order-details/:ref", element: <OrderDetail /> },
        ],
      },
    ],
  },
]);
