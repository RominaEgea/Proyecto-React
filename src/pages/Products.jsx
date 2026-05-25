import { ItemListContainer } from "../components/ItemListContainer/ItemListContainer";
import "./Products.css";

export const Products = () => {
  return (
    <div className="products-page">
      <div className="products-page__header">
        <div className="products-page__header-inner">
          <h1 className="products-page__title">Colección completa</h1>
          <p className="products-page__subtitle">Prendas seleccionadas para cada estilo y ocasión</p>
        </div>
      </div>
      <ItemListContainer />
    </div>
  );
};
