import { Link } from "react-router-dom";
import "./NotFound.css";

export const NotFound = () => {
  return (
    <div className="not-found">
      <span className="not-found__number">404</span>
      <h2 className="not-found__title">Página no encontrada</h2>
      <p className="not-found__desc">La página que buscás no existe o fue movida.</p>
      <Link to="/" className="not-found__link">← Volver al inicio</Link>
    </div>
  );
};
