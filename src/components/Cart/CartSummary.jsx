import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export const CartSummary = () => {
  const { getCartTotal, getTotalItems, checkout } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = getCartTotal();
  const itemCount = getTotalItems();

  const SHIPPING_COST = 3500;
  const FREE_SHIPPING_LIMIT = 30000;
  const shippingCost = total >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST;
  const grandTotal = total + shippingCost;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(value);

  const handleCheckout = async () => {
    setIsProcessing(true);
    await checkout();
    setIsProcessing(false);
  };

  return (
    <aside className="cart__summary">
      <h2 className="cart__summary-title">Resumen</h2>
      <div className="cart__summary-row">
        <span>Productos ({itemCount})</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <div className="cart__summary-row">
        <span>Envío</span>
        {shippingCost === 0 ? (
          <span className="cart__free">Gratis</span>
        ) : (
          <span>{formatCurrency(shippingCost)}</span>
        )}
      </div>
      <div className="cart__summary-total">
        <span>Total</span>
        <span>{formatCurrency(grandTotal)}</span>
      </div>
      <button 
        className="cart__btn cart__btn--primary" 
        onClick={handleCheckout} 
        disabled={isProcessing || itemCount === 0}
      >
        {isProcessing ? "Procesando..." : "Finalizar compra"}
      </button>
      <Link className="cart__btn cart__btn--ghost" to="/productos">
        Seguir comprando
      </Link>
    </aside>
  );
};
