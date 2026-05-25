import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { CartPage } from "./pages/CartPage";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    // Req #3: rutas gestionadas con react-router-dom
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Req #3: / - vista principal */}
        <Route index element={<Home />} />
        {/* Req #3: /productos - catálogo */}
        <Route path="productos" element={<Products />} />
        {/* Req #3: /producto/:id - detalle de producto */}
        <Route path="producto/:id" element={<ProductDetail />} />
        {/* Req #3: /carrito - carrito de compras */}
        <Route path="carrito" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
