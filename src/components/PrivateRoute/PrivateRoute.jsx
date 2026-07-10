import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <div className="item-list__state">
        <div className="item-list__spinner" />
        <p>Verificando sesión…</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};
