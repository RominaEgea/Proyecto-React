import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

export const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice, totalQuantity, checkout } = useCart();

  const formatted = (price) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);

  if (cartItems.length === 0) {
    return (
      <div className="cart cart--empty">
        <div className="cart__empty-icon">🛍</div>
        <h2>Tu carrito está vacío</h2>
        <p>Explorá nuestra colección y encontrá algo que te encante.</p>
        <Link to="/productos" className="cart__btn cart__btn--primary">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1 className="cart__title">
        Mi carrito <span>({totalQuantity} {totalQuantity === 1 ? "producto" : "productos"})</span>
      </h1>

      <div className="cart__layout">
        <div className="cart__items">
          {cartItems.map((item) => (
            <div className="cart__item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart__item-img" />
              <div className="cart__item-info">
                <span className="cart__item-category">{item.category}</span>
                <h3 className="cart__item-name">{item.name}</h3>
                <p className="cart__item-price">{formatted(item.price)} × {item.quantity}</p>
              </div>
              <div className="cart__item-right">
                <strong className="cart__item-subtotal">{formatted(item.price * item.quantity)}</strong>
                <button className="cart__remove" onClick={() => removeFromCart(item.id)} aria-label="Eliminar">✕</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart__summary">
          <h3 className="cart__summary-title">Resumen</h3>
          <div className="cart__summary-row">
            <span>Subtotal</span>
            <span>{formatted(totalPrice)}</span>
          </div>
          <div className="cart__summary-row">
            <span>Envío</span>
            <span className="cart__free">{totalPrice >= 30000 ? "GRATIS" : formatted(2500)}</span>
          </div>
          <div className="cart__summary-total">
            <span>Total</span>
            <span>{formatted(totalPrice >= 30000 ? totalPrice : totalPrice + 2500)}</span>
          </div>
          <button className="cart__btn cart__btn--primary" onClick={checkout}>Finalizar compra</button>
          <button className="cart__btn cart__btn--ghost" onClick={clearCart}>Vaciar carrito</button>
        </aside>
      </div>
    </div>
  );
};
