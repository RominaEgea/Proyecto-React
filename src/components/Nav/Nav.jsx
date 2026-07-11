import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `navbar__link${isActive ? " navbar__link--active" : ""}`;

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
      <button
        type="button"
        className="navbar__toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar__list${open ? " navbar__list--open" : ""}`}>
        <li>
          <NavLink to="/" end className={linkClass} onClick={closeMenu}>Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/productos" className={linkClass} onClick={closeMenu}>Productos</NavLink>
        </li>
        <li>
          <NavLink to="/carrito" className={linkClass} onClick={closeMenu}>Carrito</NavLink>
        </li>
      </ul>

      {open && <div className="navbar__overlay" onClick={closeMenu} aria-hidden="true" />}
    </nav>
  );
};
