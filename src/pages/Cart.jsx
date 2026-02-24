import { Suspense, useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  // Fetch or create cart safely
  useEffect(() => {
    const fetchOrCreateCart = async () => {
      if (cartId) {
        try {
          setLoading(true);
          const res = await authApiClient.get(`/carts/${cartId}/`);
          setCart(res.data);
        } catch (err) {
          console.error("Failed to fetch cart:", err);
          localStorage.removeItem("cartId");
          setCartId(null);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          const res = await authApiClient.post("/carts/");
          setCart(res.data);
          setCartId(res.data.id);
          localStorage.setItem("cartId", res.data.id);
        } catch (err) {
          console.error("Failed to create cart:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrCreateCart();
  }, [cartId]);

  if (loading) return <p>Loading...</p>;
  if (!cart) return <p>No Cart Found</p>;

  // Update quantity (food instead of product)
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    newQuantity = parseInt(newQuantity, 10);
    if (newQuantity < 1) return;

    const prevCart = JSON.parse(JSON.stringify(cart));

    const updatedItems = cart.items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity: newQuantity,
            total_price: item.food.price * newQuantity,
          }
        : item
    );

    setCart({
      ...cart,
      items: updatedItems,
      total_price: updatedItems.reduce(
        (sum, item) => sum + item.total_price,
        0
      ),
    });

    try {
      await authApiClient.patch(
        `/carts/${cartId}/items/${itemId}/`,
        { quantity: newQuantity }
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setCart(prevCart); // rollback
    }
  };

  // Remove item
  const handleRemoveItem = async (itemId) => {
    const prevCart = JSON.parse(JSON.stringify(cart));

    const updatedItems = cart.items.filter(
      (item) => item.id !== itemId
    );

    setCart({
      ...cart,
      items: updatedItems,
      total_price: updatedItems.reduce(
        (sum, item) => sum + item.total_price,
        0
      ),
    });

    try {
      await authApiClient.delete(
        `/carts/${cartId}/items/${itemId}/`
      );
    } catch (err) {
      console.error("Failed to remove item:", err);
      setCart(prevCart); // rollback
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Suspense fallback={<p>Loading cart items...</p>}>
            <CartItemList
              items={cart.items}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
            />
          </Suspense>
        </div>
        <div>
          <CartSummary
            totalPrice={cart.total_price}
            itemCount={cart.items.length}
            cartId={cartId}
            setCart={setCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;