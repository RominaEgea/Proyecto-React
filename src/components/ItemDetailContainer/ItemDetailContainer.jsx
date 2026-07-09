import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ItemDetail } from "../ItemDetail/ItemDetail";

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => String(p.id) === String(id));
        setProduct(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando producto…</p>;
  if (!product) return <p>Producto no encontrado</p>;

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
