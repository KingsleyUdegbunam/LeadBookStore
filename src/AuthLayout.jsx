import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthHeader } from "./component/Header/AuthHeader";

export default function AuthLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <AuthHeader />
      <main className="auth-layout">
        <Outlet />
      </main>
    </>
  );
}
