import "./Footer.css";
import { Link } from 'react-router-dom'

const team = [
  {
    name: 'Romina Egea',
    role: 'Fundadora & Directora Creativa',
    initials: 'RE',
    color: '#c9a96e',
  },
  {
    name: 'Ludmila Egea',
    role: 'Diseñadora de Colecciones',
    initials: 'LE',
    color: '#9b8ea0',
  },
  {
    name: 'Elizabeth Egea',
    role: 'Directora de Marketing',
    initials: 'EE',
    color: '#7a9e8e',
  },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__brand">
          <span className="footer__logo">Romina S.A.</span>
          <p className="footer__tagline">Moda que te define.<br />Desde Santiago del Estero para el mundo.</p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram" className="footer__social-link">IG</a>
            <a href="#" aria-label="TikTok" className="footer__social-link">TK</a>
            <a href="#" aria-label="Pinterest" className="footer__social-link">PT</a>
          </div>
        </div>

        <div className="footer__links">
          <h4 className="footer__heading">Navegación</h4>
          <ul className="footer__list">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
          </ul>
        </div>

        <div className="footer__links">
          <h4 className="footer__heading">Información</h4>
          <ul className="footer__list">
            <li><a href="#">Envíos y devoluciones</a></li>
            <li><a href="#">Guía de talles</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        <div className="footer__team-section">
          <h4 className="footer__heading">Nuestro equipo</h4>
          <div className="footer__team">
            {team.map(({ name, role, initials, color }) => (
              <div className="footer__card" key={name}>
                <div className="footer__avatar" style={{ backgroundColor: color }}>
                  {initials}
                </div>
                <div className="footer__card-info">
                  <strong>{name}</strong>
                  <span>{role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Romina S.A. — Todos los derechos reservados.</p>
        <p>Santiago del Estero, Argentina · info@rominasa.com.ar</p>
      </div>
    </footer>
  );
};
