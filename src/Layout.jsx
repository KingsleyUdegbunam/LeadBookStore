import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./component/Header/Header";
import { Footer } from "./component/Footer";
import { useUI } from "./context/UIContext";
import { AccountDrawer } from "./feature/account/components/AccountDrawer";
import "./Layout.css";

export default function Layout() {
  const pathname = useLocation();
  const { openAccountDrawer, setOpenAccountDrawer } = useUI();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (openAccountDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openAccountDrawer]);
  return (
    <>
      <AccountDrawer
        isOpen={openAccountDrawer}
        onClose={() => {
          setOpenAccountDrawer(false);
        }}
      />
      <div className="app-layout-wrapper">
        <Header />
        <main className="app-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
