import { Link } from "react-router-dom";
import "./Item.css";

export const Item = ({ id, name, price, image, category, tag, stock, children }) => {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <article className="item">
      <Link to={`/producto/${id}`} className="item__image-wrap">
        <img src={image} alt={name} className="item__image" loading="lazy" />
        {tag && <span className="item__tag">{tag}</span>}
        {stock <= 5 && <span className="item__stock-warning">¡Últimos {stock}!</span>}
        <div className="item__overlay">
          <span className="item__cta">Ver detalle →</span>
        </div>
      </Link>
      <div className="item__info">
        {category && <span className="item__category">{category}</span>}
        <h3 className="item__name">{name}</h3>
        <p className="item__price">{formattedPrice}</p>
        {children}
      </div>
    </article>
  );
};
