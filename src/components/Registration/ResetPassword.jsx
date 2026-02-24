import { useForm } from "react-hook-form";
import { useState } from "react";
import apiClient from "../../services/api-client";

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setSuccessMsg("");
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/reset_password/", { email: data.email });
      setSuccessMsg("Password reset email has been sent successfully.");
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.detail || "Failed to send password reset email."
      );
    }
  };

  return (
    <div className="min-h-screen">
        <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        {successMsg && <p className="text-green-500 mb-3">{successMsg}</p>}
        {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
            <label className="label">Email</label>
            <input
                type="email"
                className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
            >
            {isSubmitting ? "Sending..." : "Send Reset Email"}
            </button>
        </form>
        </div>
    </div>
  );
};

export default ResetPassword;