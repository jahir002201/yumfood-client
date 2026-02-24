import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import apiClient from "../../services/api-client";

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setErrorMsg("");
    setSuccessMsg("");
    if (data.new_password !== data.confirm_new_password) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      await apiClient.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: data.new_password
      });
      setSuccessMsg("Password has been reset successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setErrorMsg(error?.response?.data?.detail || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen">
        <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Set New Password</h2>

        {successMsg && <p className="text-green-500 mb-3">{successMsg}</p>}
        {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
            <label className="label">New Password</label>
            <input
                type="password"
                className="input input-bordered w-full"
                {...register("new_password", { required: "New password is required" })}
            />
            {errors.new_password && <p className="text-red-500">{errors.new_password.message}</p>}
            </div>

            <div className="form-control">
            <label className="label">Confirm New Password</label>
            <input
                type="password"
                className="input input-bordered w-full"
                {...register("confirm_new_password", { required: "Confirm password is required" })}
            />
            {errors.confirm_new_password && <p className="text-red-500">{errors.confirm_new_password.message}</p>}
            </div>

            <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
            >
            {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
        </form>
        </div>
    </div>
  );
};

export default ResetPasswordConfirm;