import { useEffect, useState } from "react";
import { Item } from "../Item/Item";
import "./ItemListContainer.css";

export const ItemListContainer = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Req #2: carga desde productos.json con useEffect y fetch
    fetch("/productos.json")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar los productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="item-list__state">
        <div className="item-list__spinner" />
        <p>Cargando colección…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-list__state item-list__state--error">
        <p>⚠ {error}</p>
      </div>
    );
  }

  return (
    <section className="item-list-container">
      {title && <h2 className="item-list__title">{title}</h2>}
      {/* Req #2: renderizado con componente reutilizable Item.jsx via props */}
      <div className="item-list__grid">
        {products.map((product) => (
          <Item key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};
