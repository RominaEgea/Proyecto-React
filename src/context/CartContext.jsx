import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Req #4: addToCart llamada desde vista de detalle
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Alias para compatibilidad con código existente
  const addItem = (product) => addToCart(product, 1);

  const removeItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id));
  const removeFromCart = removeItem;

  const clearCart = () => setCartItems([]);

  // Req #4: CartWidget muestra cantidad total
  const getTotalItems = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalQuantity = getTotalItems();

  const getCartTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalPrice = getCartTotal();

  const checkout = () => {
    alert("Su compra ha sido realizada 🎉");
    clearCart();
    navigate("/");
  };

  return (
    <CartContext.Provider value={{
      cart: cartItems,
      cartItems,
      addItem,
      addToCart,
      removeItem,
      removeFromCart,
      clearCart,
      getTotalItems,
      totalQuantity,
      getCartTotal,
      totalPrice,
      checkout,
    }}>
      {children}
    </CartContext.Provider>
  );
};
