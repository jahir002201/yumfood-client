import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErroAlert";
import { useState } from "react";

const Register = () => {
  const { registerUser, errorMsg } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    delete data.confirm_password;
    setLoading(true);
    try {
      const response = await registerUser(data);
      if (response.success) {
        setSuccessMsg(response.message);
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl">
        <div className="card-body p-8 space-y-4">
          {errorMsg && <ErroAlert error={errorMsg} />}
          {successMsg && (
            <div className="alert alert-success flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
          <p className="text-gray-500">Create an account to get started</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="input input-bordered w-full"
                  {...register("first_name", { required: "First Name is Required" })}
                />
                {errors.first_name && (
                  <span className="text-red-500 text-sm">{errors.first_name.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="input input-bordered w-full"
                  {...register("last_name", { required: "Last Name is Required" })}
                />
                {errors.last_name && (
                  <span className="text-red-500 text-sm">{errors.last_name.message}</span>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="input input-bordered w-full"
                {...register("email", { required: "Email is Required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">Address</label>
              <input
                type="text"
                placeholder="7/A Dhanmondi, Dhaka"
                className="input input-bordered w-full"
                {...register("address")}
              />
            </div>

            <div className="form-control">
              <label className="label">Phone Number</label>
              <input
                type="text"
                placeholder="0123456789"
                className="input input-bordered w-full"
                {...register("phone_number")}
              />
            </div>

            <div className="form-control">
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (val) => val === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirm_password && (
                <span className="text-red-500 text-sm">{errors.confirm_password.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-4 text-gray-500">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-semibold">
                Sign In
              </Link>
            </p>
            <p>
              Didn’t receive activation email?{" "}
              <Link to="/resend-activation" className="link link-primary">
                Resend Activation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;