import authApiClient from "../../services/auth-api-client";

const CartSummary = ({ totalPrice, itemCount, cartId, setCart }) => {
  const subtotal = Number(totalPrice) || 0;
  const shipping = subtotal === 0 || subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const orderTotal = subtotal + shipping + tax;

  const clearCart = () => {
    localStorage.removeItem("cartId");
    if (setCart) setCart(null); // clears cart in UI
  };

  const createOrder = async () => {
    if (!cartId) {
      alert("No cart available to place an order.");
      return;
    }

    try {
      const res = await authApiClient.post("/orders/", { cart_id: cartId });
      if (res.status === 201) {
        clearCart();
        alert("Order placed successfully!");
      } else {
        console.error("Unexpected response:", res);
        alert("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Failed to create order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal ({itemCount} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Order Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button
            disabled={itemCount === 0 || !cartId}
            onClick={createOrder}
            className="btn btn-primary w-full"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;