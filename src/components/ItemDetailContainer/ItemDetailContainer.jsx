import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useCart } from "../../context/CartContext";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import "../ItemDetail/ItemDetail.css";

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- se re-ejecuta al cambiar `id` (navegación entre productos)
    setLoading(true);
    getDoc(doc(db, "productos", id))
      .then((snap) => {
        setProduct(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      })
      .finally(() => setLoading(false));
  }, [id]);

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
        <p>Puede que el producto haya sido eliminado o el enlace sea incorrecto.</p>
        <Link to="/productos" className="detail__go-cart">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <ItemDetail
      product={product}
      quantity={quantity}
      onAdd={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
      onSubtract={() => setQuantity((q) => Math.max(1, q - 1))}
      onAddToCart={() => addToCart(product, quantity)}
    />
  );
};
