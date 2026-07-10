import { useCart } from "../../context/CartContext";

export const CartItem = ({ item }) => {
  const { removeItem } = useCart();

  const formatPrice = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <article className="cart__item">
      <img src={item.image} alt={item.name} className="cart__item-img" />
      <div className="cart__item-info">
        {item.category && <span className="cart__item-category">{item.category}</span>}
        <h3 className="cart__item-name">{item.name}</h3>
        <p className="cart__item-price">{formatPrice(item.price)} × {item.quantity}</p>
      </div>
      <div className="cart__item-right">
        <span className="cart__item-subtotal">{formatPrice(item.price * item.quantity)}</span>
        <button
          className="cart__remove"
          onClick={() => removeItem(item.id)}
          aria-label={`Quitar ${item.name} del carrito`}
        >
          ✕
        </button>
      </div>
    </article>
  );
};
