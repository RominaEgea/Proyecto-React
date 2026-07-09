import { useCart } from "../context/CartContext";
import { CartView } from "../components/Cart/CartView";

export const CartPage = () => {
  const { cart } = useCart();
  return <CartView hasItems={cart.length > 0} />;
};
