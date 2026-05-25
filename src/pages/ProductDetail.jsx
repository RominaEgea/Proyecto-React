import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  // Req #4: addToCart del contexto
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => String(p.id) === String(id));
        setProduct(found || null);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    // Req #4: llamada a addToCart
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formatted = (price) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);

  if (loading) {
    return (
      <div className="detail__loading">
        <div className="detail__spinner" />
        <p>Cargando producto…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="detail__not-found">
        <h2>Producto no encontrado</h2>
        <Link to="/productos">← Volver al catálogo</Link>
      </div>
    );
  }

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
          <p className="detail__price">{formatted(product.price)}</p>
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
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock || 99, q + 1))} disabled={quantity >= (product.stock || 99)}>+</button>
            </div>
          </div>

          <button
            className={`detail__add-btn${added ? " detail__add-btn--added" : ""}`}
            onClick={handleAddToCart}
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
