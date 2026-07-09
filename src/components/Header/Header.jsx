import { Link } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import { CartWidget } from "../CartWidget/CartWidget";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <p className="header__announcement">✦ Envío gratis en compras mayores a $30.000 ✦</p>
      </div>
      <div className="header__main">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">Romina</span>
          <span className="header__logo-sub">S.A.</span>
        </Link>
        <Nav />
        <div className="header__actions">
          <CartWidget />
        </div>
      </div>
    </header>
  );
};
