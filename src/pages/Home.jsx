import { Link } from "react-router-dom";
import { ItemListContainer } from "../components/ItemListContainer/ItemListContainer";
import "./Home.css";
import logo from "../../public/img/moda.jpg";

export const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">Nueva colección 2026</span>
          <h1 className="hero__title">
            La moda que<br />
            <em>te define.</em>
          </h1>
          <p className="hero__desc">
            Prendas diseñadas con materiales seleccionados.
            Elegancia atemporal para cada momento.
          </p>
          <Link to="/productos" className="hero__cta">
            Explorar colección →
          </Link>
        </div>
        <div className="hero__visual">
          <div className="hero__img-wrap">
            <img
              src={logo}    alt="Moda Romina SA"
            />
          </div>
          <div className="hero__badge">
            <span>Envío gratis</span>
            <strong>+$30.000</strong>
          </div>
        </div>
      </section>

      {/* Categories strip */}
      <section className="categories">
        <div className="categories__inner">
          {["Vestidos", "Sacos", "Pantalones", "Faldas", "Abrigos", "Tops"].map((cat) => (
            <Link to="/productos" key={cat} className="categories__pill">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Products preview */}
      <ItemListContainer title="Nuestra colección" />
    </>
  );
};
