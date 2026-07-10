import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export const CartSummary = () => {
  const { getCartTotal, getTotalItems, checkout } = useCart();

  const total = getCartTotal();
  const itemCount = getTotalItems();

  const formattedTotal = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(total);

  return (
    <aside className="cart__summary">
      <h2 className="cart__summary-title">Resumen</h2>
      <div className="cart__summary-row">
        <span>Productos ({itemCount})</span>
        <span>{formattedTotal}</span>
      </div>
      <div className="cart__summary-row">
        <span>Envío</span>
        <span className="cart__free">Gratis</span>
      </div>
      <div className="cart__summary-total">
        <span>Total</span>
        <span>{formattedTotal}</span>
      </div>
      <button className="cart__btn cart__btn--primary" onClick={checkout}>
        Finalizar compra
      </button>
      <Link className="cart__btn cart__btn--ghost" to="/productos">
        Seguir comprando
      </Link>
    </aside>
  );
};
