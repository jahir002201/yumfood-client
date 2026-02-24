import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import authApiClient from "../../services/auth-api-client";
import { useEffect, useState, useCallback } from "react";
import ReviewList from "./ReviewList";
import apiClient from "../../services/api-client";
import useAuthContext from "../../hooks/useAuthContext";

const ReviewSection = () => {
  const { foodId } = useParams();
  const { user } = useAuthContext();

  const [reviews, setReviews] = useState([]);
  const [userCanReview, setUserCanReview] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [editReview, setEditReview] = useState({ ratings: 0, comment: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch reviews and check permission
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Check if user has ordered the food
      const permissionRes = await authApiClient.get(
        `/orders/has-ordered/${foodId}/`
      );
      setUserCanReview(permissionRes.data.hasOrdered);

      // Fetch reviews
      const reviewsRes = await apiClient.get(
        `/foods/${foodId}/reviews/`
      );
      setReviews(reviewsRes.data);
    } catch (error) {
      console.log("Error fetching reviews or permission", error);
    } finally {
      setLoading(false);
    }
  }, [foodId]);

  // Initial fetch
  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user, fetchData]);

  // Submit a new review
  const onSubmit = async (data) => {
    try {
      await authApiClient.post(`/foods/${foodId}/reviews/`, data);
      fetchData();
    } catch (error) {
      console.log("Error submitting review", error);
    }
  };

  // Update an existing review
  const handleUpdateReview = async (reviewId) => {
    try {
      await authApiClient.put(
        `/foods/${foodId}/reviews/${reviewId}/`,
        editReview
      );
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.log("Error updating review", error);
    }
  };

  // Delete a review
  const handleDeleteReview = async (reviewId) => {
    try {
      await authApiClient.delete(
        `/foods/${foodId}/reviews/${reviewId}/`
      );
      fetchData();
    } catch (error) {
      console.log("Error deleting review", error);
    }
  };

  return (
    <div className="space-y-8 mt-10 max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="badge badge-lg">
          {reviews.length} {reviews.length <= 1 ? "Review" : "Reviews"}
        </div>
      </div>

      {/* Review Form */}
      {userCanReview && (
        <div className="card bg-base-100 shadow-lg border border-base-200 rounded-xl overflow-hidden">
          <div className="card-body">
            <h3 className="card-title text-lg">Write a Review</h3>
            <ReviewForm onSubmit={onSubmit} />
          </div>
        </div>
      )}

      <div className="divider"></div>

      {/* Review List or Loading / Empty State */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
          <p className="text-base-content/70">
            Be the first to review this food!
          </p>
        </div>
      ) : (
        <ReviewList
          reviews={reviews}
          user={user}
          editReview={editReview}
          setEditReview={setEditReview}
          editingId={editingId}
          setEditingId={setEditingId}
          handleUpdateReview={handleUpdateReview}
          handleDeleteReview={handleDeleteReview}
        />
      )}
    </div>
  );
};

export default ReviewSection;