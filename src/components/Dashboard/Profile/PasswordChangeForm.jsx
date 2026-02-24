import { useState } from "react";

const PasswordChangeForm = ({ register, errors, watch, isEditing }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-teal-600 font-semibold hover:underline"
      >
        Change Password
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 border-l-4 border-rose-200 pl-4">
          
          {["current_password", "new_password", "confirm_new_password"].map(
            (field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {field === "current_password"
                    ? "Current Password"
                    : field === "new_password"
                    ? "New Password"
                    : "Confirm New Password"}
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:bg-gray-100"
                  {...register(field, {
                    required:
                      field !== "confirm_new_password"
                        ? "This field is required"
                        : false,
                    minLength:
                      field === "new_password"
                        ? {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          }
                        : undefined,
                    validate:
                      field === "confirm_new_password"
                        ? (value) =>
                            value === watch("new_password") ||
                            "Passwords do not match"
                        : undefined,
                  })}
                />

                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field].message}
                  </p>
                )}
              </div>
            )
          )}

          {isEditing && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="accent-teal-500"
              />
              <span className="text-sm text-gray-600">
                Show Password
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;