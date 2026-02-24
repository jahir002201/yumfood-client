import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";
import useAuthContext from "./useAuthContext";

const useCart = () => {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  // Create or get cart
  const createOrGetCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/carts/", {});
      localStorage.setItem("cartId", response.data.id);
      setCartId(response.data.id);
      setCart(response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating/getting cart:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add items to cart
const addCartItems = useCallback(
  async (foodId, quantity) => {
    setLoading(true);
    try {
      let currentCartId = cartId;

      // Ensure cart exists
      if (!currentCartId) {
        const newCart = await createOrGetCart();
        currentCartId = newCart.id;
      }

      const payload = {
        food_id: foodId, 
        quantity: Number(quantity),
      };

      const response = await authApiClient.post(
        `/carts/${currentCartId}/items/`,
        payload
      );

      // Update local cart state
      setCart((prevCart) => ({
        ...prevCart,
        items: [...prevCart.items, response.data],
      }));

      return response.data;
    } catch (error) {
      console.error("Error adding items to cart:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  },
  [cartId, createOrGetCart]
);


  // Update item quantity
  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      try {
        const response = await authApiClient.patch(
          `/carts/${cartId}/items/${itemId}/`,
          { quantity: Number(quantity) }
        );

        // Update local cart state
        setCart((prevCart) => ({
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.id === itemId ? response.data : item
          ),
        }));
      } catch (error) {
        console.error("Error updating cart item:", error.response?.data || error);
      }
    },
    [cartId]
  );

  // Delete cart item
  const deleteCartItems = useCallback(
    async (itemId) => {
      try {
        await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`);
        setCart((prevCart) => ({
          ...prevCart,
          items: prevCart.items.filter((item) => item.id !== itemId),
        }));
      } catch (error) {
        console.error("Error deleting cart item:", error.response?.data || error);
      }
    },
    [cartId]
  );

  // Initialize cart on mount
  useEffect(() => {
    if(!user) return
    const initializeCart = async () => {
      setLoading(true);
      await createOrGetCart();
      setLoading(false);
    };
    initializeCart();
  }, [user, createOrGetCart]);

  return {
    cart,
    cartId,
    loading,
    createOrGetCart,
    addCartItems,
    updateCartItemQuantity,
    deleteCartItems,
  };
};

export default useCart;