import { Link, useParams } from "react-router";
import AddToCartButton from "../components/FoodDetails/AddToCartButton";
import FoodImageGallery from "../components/FoodDetails/FoodImageGallery";
import ReviewSection from "../components/Reviews/ReviewSection";
import { FaArrowLeft } from "react-icons/fa";
import { Suspense, useEffect, useState } from "react";
import apiClient from "../services/api-client";

const FoodDetail = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchFood = async () => {
      try {
        const res = await apiClient.get(`/foods/${foodId}/`);
        if (isMounted) setFood(res.data);
      } catch (err) {
        console.error("Error fetching food:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFood();
    return () => { isMounted = false; };
  }, [foodId]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!food) return <div className="text-center py-20">Food Not Found...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back link */}
      <div className="mb-6">
        <Link
          to="/foods"
          className="flex items-center text-sm text-gray-600 hover:text-teal-600 transition"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Back to foods
        </Link>
      </div>

      {/* Food details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <Suspense
          fallback={
            <div className="aspect-square bg-gray-100 animate-pulse rounded-lg"></div>
          }
        >
          <FoodImageGallery images={food?.images} foodName={food.name} />
        </Suspense>

        <div className="flex flex-col">
          <div className="mb-4">
            <div className="badge badge-outline mb-2 text-teal-600">
              Category: {food.category}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">
              {food.name}
            </h1>
          </div>

          <div className="mt-2 mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-800">${food.price}</span>
              <span className="text-sm text-gray-500">
                (${food.price_with_tax} incl. tax)
              </span>
            </div>
          </div>

          <div className="prose prose-sm text-gray-700 mb-6">
            <p>{food.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Availability:</span>
              {food.stock > 0 ? (
                <div className="badge badge-outline bg-green-100 text-green-700 border-green-200">
                  In Stock ({food.stock} available)
                </div>
              ) : (
                <div className="badge badge-outline bg-red-100 text-red-600 border-red-200">
                  Out of Stock
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <AddToCartButton food={food} />
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="mt-12">
        <ReviewSection />
      </div>
    </div>
  );
};

export default FoodDetail;