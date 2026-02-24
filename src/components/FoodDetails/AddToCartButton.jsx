import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import useCartContext from "../../hooks/useCartContext";

const AddToCartButton = ({ food }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addCartItems } = useCartContext();

  const decreaseQuantity = () => setQuantity((q) => Math.max(q - 1, 1));
  const increaseQuantity = () => setQuantity((q) => Math.min(q + 1, food.stock));

  const addToCart = async () => {
    setIsAdding(true);
    try {
      await addCartItems(food.id, Number(quantity));
      setIsAdded(true);
    } catch (error) {
      console.error("Add to cart failed:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="join">
        <button
          className="btn btn-outline join-item"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
        >
          <FaMinus className="h-4 w-4" />
        </button>
        <input
          type="number"
          value={quantity}
          min={1}
          max={food.stock}
          onChange={(e) =>
            setQuantity(Math.min(Math.max(Number(e.target.value), 1), food.stock))
          }
          className="input input-bordered join-item w-16 text-center"
        />
        <button
          className="btn btn-outline join-item"
          onClick={increaseQuantity}
          disabled={quantity >= food.stock}
        >
          <FaPlus className="h-4 w-4" />
        </button>
      </div>

      <button
        className={`btn w-full ${isAdded ? "bg-green-500 hover:bg-green-600 text-white" : "btn-primary"}`}
        onClick={addToCart}
        disabled={isAdding || isAdded || food.stock === 0}
      >
        {isAdding ? (
          <span className="flex items-center">
            <span className="loading loading-spinner loading-sm mr-2"></span>
            Adding...
          </span>
        ) : isAdded ? (
          <span className="flex items-center">
            <FaCheck className="mr-2 h-4 w-4" />
            Added to Cart
          </span>
        ) : (
          <span className="flex items-center">
            <FaShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </span>
        )}
      </button>
    </div>
  );
};

export default AddToCartButton;