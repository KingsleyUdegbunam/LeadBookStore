import { Link } from "react-router-dom";
import "./AuthHeader.css";

export function AuthHeader() {
  return (
    <header className="auth-header">
      <Link className="logo" to="/">
        LEAD
      </Link>
    </header>
  );
}
