import { Link } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import "./Footer.css";
import { BrandLogo } from "./brand-logo/BrandLogo";

export function Footer() {
  const { session } = UseAuth();

  const explore = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/shop" },
    { title: "About", link: "/about" },
  ];

  const accountAuthenticated = [
    { title: "Orders", link: "/account/orders" },
    { title: "Settings", link: "/account/account-settings" },
  ];

  const accountGuest = [
    { title: "Sign In", link: "/signin" },
    { title: "Create Account", link: "/signup" },
  ];

  return (
    <footer>
      <div className="footer-wrapper pages-wrapper-variation">
        <header className="footer-header">
          <div className="logo-and-supporting-txt">
            <BrandLogo variant={"light"} size={"large"} />
            <div className="footer-header-slogan">
              <p>Leadership is our genre</p>

              <p>Great books are our medium.</p>
            </div>
          </div>
          <p>
            We curate books that cultivate leadership through stories, business,
            self-development, and lived experiences.
          </p>
        </header>

        <div className="footer-grid">
          <div className="footer-links">
            <p className="footer-link-header">Explore</p>
            <nav className="link-tree">
              {explore.map((col, key) => (
                <Link key={key} to={col.link}>
                  {col.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-links">
            <p className="footer-link-header">Account</p>
            {session ? (
              <nav className="link-tree">
                {accountAuthenticated.map((col, key) => (
                  <Link key={key} to={col.link}>
                    {col.title}
                  </Link>
                ))}
              </nav>
            ) : (
              <nav className="link-tree">
                {accountGuest.map((col, key) => (
                  <Link key={key} to={col.link}>
                    {col.title}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>

        <div className="footer-foot">
          <p className="copyright">&copy; 2026 LEAD Inc. </p>
          <div>
            <p className="copyright">
              Proudly Nigerian <span>🇳🇬</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
