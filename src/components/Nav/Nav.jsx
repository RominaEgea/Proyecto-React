import { NavLink } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  const linkClass = ({ isActive }) =>
    `navbar__link${isActive ? " navbar__link--active" : ""}`;

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li>
          <NavLink to="/" end className={linkClass}>Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/productos" className={linkClass}>Productos</NavLink>
        </li>
        <li>
          <NavLink to="/carrito" className={linkClass}>Carrito</NavLink>
        </li>
      </ul>
    </nav>
  );
};
