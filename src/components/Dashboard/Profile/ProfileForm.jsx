const ProfileForm = ({ register, errors, isEditing }) => {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          First Name
        </label>
        <input
          type="text"
          disabled={!isEditing}
          className="w-full px-4 py-2 rounded-lg border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:bg-gray-100"
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.first_name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Last Name
        </label>
        <input
          type="text"
          disabled={!isEditing}
          className="w-full px-4 py-2 rounded-lg border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:bg-gray-100"
          {...register("last_name")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email Address
        </label>
        <input
          type="email"
          disabled
          className="w-full px-4 py-2 rounded-lg border bg-gray-100 shadow-sm"
          {...register("email")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Address
        </label>
        <input
          type="text"
          disabled={!isEditing}
          className="w-full px-4 py-2 rounded-lg border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:bg-gray-100"
          {...register("address")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Phone Number
        </label>
        <input
          type="text"
          disabled={!isEditing}
          className="w-full px-4 py-2 rounded-lg border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:bg-gray-100"
          {...register("phone_number")}
        />
      </div>
    </div>
  );
};

export default ProfileForm;