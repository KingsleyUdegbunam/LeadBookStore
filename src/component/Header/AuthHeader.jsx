import { BrandLogo } from "../../component/brand-logo/BrandLogo";
import "./AuthHeader.css";

export function AuthHeader() {
  return (
    <header className="auth-header pages-wrapper-variation">
      <BrandLogo variant={"dark"} />
    </header>
  );
}
