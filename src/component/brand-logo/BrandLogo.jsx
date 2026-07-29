import { Link } from "react-router-dom";
import "./BrandLogo.css";

export function BrandLogo({ variant, size }) {
  return (
    <Link to="/" className={`logo logo-${variant} logo-${size}`}>
      LEAD<span className={`logo-dot-${variant}`}>.</span>
    </Link>
  );
}
