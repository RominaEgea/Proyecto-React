import "./ItemDetail.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ItemDetail = ({ product, quantity, onAdd, onSubtract, onAddToCart }) => {
  const [added, setAdded] = useState(false);

  const formatted = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(product.price);

  const handleAdd = () => {
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="detail">
      <div className="detail__breadcrumb">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to="/productos">Productos</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="detail__grid">
        <div className="detail__image-wrap">
          {product.tag && <span className="detail__tag">{product.tag}</span>}
          <img src={product.image} alt={product.name} className="detail__image" />
        </div>

        <div className="detail__info">
          <span className="detail__category">{product.category}</span>
          <h1 className="detail__name">{product.name}</h1>
          <p className="detail__price">{formatted}</p>
          <p className="detail__desc">{product.description}</p>

          {product.stock && (
            <div className="detail__stock">
              {product.stock > 5
                ? <span className="detail__in-stock">✓ En stock ({product.stock} disponibles)</span>
                : <span className="detail__low-stock">⚠ Últimas {product.stock} unidades</span>
              }
            </div>
          )}

          <div className="detail__quantity">
            <label className="detail__qty-label">Cantidad</label>
            <div className="detail__qty-control">
              <button onClick={onSubtract} disabled={quantity <= 1}>−</button>
              <span>{quantity}</span>
              <button onClick={onAdd} disabled={quantity >= (product.stock || 99)}>+</button>
            </div>
          </div>

          <button
            className={`detail__add-btn${added ? " detail__add-btn--added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Agregado al carrito" : "Agregar al carrito"}
          </button>

          {added && (
            <Link to="/carrito" className="detail__go-cart">
              Ir al carrito →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
