import { Link } from "react-router-dom";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import "./Cart.css";

export const CartView = ({ hasItems }) => {
  return (
    <section className="cart">
      <h1 className="cart__title">Tu carrito de compras</h1>
      {hasItems ? (
        <div className="cart__layout">
          <CartList />
          <CartSummary />
        </div>
      ) : (
        <div className="cart--empty">
          <span className="cart__empty-icon">🛒</span>
          <h2>Tu carrito está vacío</h2>
          <p>Todavía no agregaste productos. Explorá la colección y encontrá algo que te encante.</p>
          <Link className="cart__btn cart__btn--primary" to="/productos" style={{ width: "auto", padding: "0.9rem 2rem" }}>
            Ver productos
          </Link>
        </div>
      )}
    </section>
  );
};
