import { Link } from "react-router-dom";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import "./Cart.css";

export const CartView = ({ hasItems }) => {
  return (
    <section className="cart-container">
      <h1>Tu carrito de compras 🛒</h1>
      {hasItems ? (
        <>
          <CartList />
          <CartSummary />
        </>
      ) : (
        <>
          <p className="empty-cart">Tu carrito está listo para tus compras</p>
          <Link className="btn primary bg-primary" to="/">Volver</Link>
        </>
      )}
    </section>
  );
};
