import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./component/Header/Header";
import { Footer } from "./component/Footer";
import { UseUI } from "./context/UIContext";
import { AccountDrawer } from "./feature/account/components/AccountDrawer";
import { SearchDrawer } from "./feature/shop/components/SearchDrawer";
import "./Layout.css";

export default function Layout() {
  const pathname = useLocation();
  const {
    openAccountDrawer,
    setOpenAccountDrawer,
    openSearchDrawer,
    setOpenSearchDrawer,
  } = UseUI();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (openAccountDrawer || openSearchDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openAccountDrawer, openSearchDrawer]);
  return (
    <>
      <AccountDrawer
        isOpen={openAccountDrawer}
        onClose={() => {
          setOpenAccountDrawer(false);
        }}
      />
      <SearchDrawer
        isOpen={openSearchDrawer}
        onClose={() => setOpenSearchDrawer(false)}
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
