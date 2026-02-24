const ProfileButtons = ({ isEditing, setIsEditing, isSubmitting }) => {
  return (
    <div className="flex justify-center pt-6">
      {isEditing ? (
        <div className="space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2 bg-teal-500 text-white rounded-xl shadow hover:bg-teal-600 transition disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-8 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="px-8 py-2 bg-pink-400 text-white rounded-xl shadow hover:bg-pink-500 transition"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileButtons;