import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeItem = (id) => setCartItems((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCartItems([]);

  const getTotalItems = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const getCartTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const checkout = () => {
    alert("Su compra ha sido realizada 🎉");
    clearCart();
  };

  return (
    <CartContext.Provider value={{
      cart: cartItems,
      addToCart,
      removeItem,
      clearCart,
      getTotalItems,
      getCartTotal,
      checkout,
    }}>
      {children}
    </CartContext.Provider>
  );
};
