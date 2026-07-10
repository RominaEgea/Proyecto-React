import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartPage } from "./pages/CartPage";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Products />} />
        <Route path="producto/:id" element={<ItemDetailContainer />} />
        <Route path="carrito" element={<CartPage />} />
        {/* Rutas ocultas: no aparecen en ningún menú de navegación */}
        <Route path="login" element={<Login />} />
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
