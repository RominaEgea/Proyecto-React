import { createContext, useContext, useState } from "react";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../firebase/firebase";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components -- Patrón intencional: hook + Provider en el mismo Context.
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

  const checkout = async () => {
    if (cartItems.length === 0) return false;

    try {
      await runTransaction(db, async (transaction) => {
        // 1. Preparar referencias de los productos y agendar lecturas
        const productRefs = cartItems.map((item) => ({
          item,
          ref: doc(db, "productos", item.id),
        }));

        // Leer todos los productos de Firestore en la transacción
        const snapshots = [];
        for (const { ref } of productRefs) {
          const snap = await transaction.get(ref);
          snapshots.push(snap);
        }

        // 2. Validar stock disponible
        const updates = [];
        for (let i = 0; i < productRefs.length; i++) {
          const { item, ref } = productRefs[i];
          const snapshot = snapshots[i];

          if (!snapshot.exists()) {
            throw new Error(`El producto "${item.name}" ya no existe en el catálogo.`);
          }

          const productData = snapshot.data();
          
          // Si tiene stock controlado (campo 'stock' definido y no nulo)
          if (productData.stock !== undefined && productData.stock !== null) {
            const currentStock = Number(productData.stock);
            if (currentStock < item.quantity) {
              throw new Error(`Stock insuficiente para "${item.name}". Disponible: ${currentStock}, solicitado: ${item.quantity}.`);
            }
            updates.push({
              ref,
              newStock: currentStock - item.quantity,
            });
          }
        }

        // 3. Aplicar los descuentos de stock
        for (const { ref, newStock } of updates) {
          transaction.update(ref, { stock: newStock });
        }
      });

      alert("Su compra ha sido realizada 🎉");
      clearCart();
      return true;
    } catch (error) {
      console.error("Error durante el checkout:", error);
      alert(`No se pudo completar la compra:\n${error.message}`);
      return false;
    }
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
