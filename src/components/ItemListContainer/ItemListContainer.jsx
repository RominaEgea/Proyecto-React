import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Item } from "../Item/Item";
import "./ItemListContainer.css";

export const ItemListContainer = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDocs(collection(db, "productos"))
      .then((snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProducts(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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
      <div className="item-list__grid">
        {products.map((product) => (
          <Item key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};
