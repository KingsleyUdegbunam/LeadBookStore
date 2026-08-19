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
import OrdersPage from "./Pages/account/orders/OrdersPage";
import OrderDetail from "./Pages/account/orderDetails/OrderDetail";
import { Settings } from "./Pages/account/setting/Settings";
import { NotFound } from "./Pages/not-found/NotFound";
import { AuthGuard } from "./routes/AuthGuard";

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
          { path: "order-details/:id", element: <OrderDetail /> },
        ],
      },
    ],
  },
]);
