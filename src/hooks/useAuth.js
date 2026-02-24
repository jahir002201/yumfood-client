import { useEffect, useState, useCallback } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  const handleAPIError = (error, defaultMessage = "Something went wrong. Try again!") => {
    console.error(error);

    if (error?.response?.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }

    setErrorMsg(defaultMessage);
    return { success: false, message: defaultMessage };
  };

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [authTokens]);

  useEffect(() => {
    if (authTokens?.access) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [authTokens, fetchUserProfile]);

  // Login user
  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      await fetchUserProfile();
    } catch (error) {
      setErrorMsg(error?.response?.data?.detail || "Login failed. Please try again.");
    }
  };

  // Register user
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message: "Registration successful. Check your email to activate your account.",
      };
    } catch (error) {
      return handleAPIError(error, "Registration failed. Please try again.");
    }
  };

  // Logout user
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    
  };

  // Update user profile
  const updateUserProfile = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.put("/auth/users/me/", data, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      // Refresh profile after update
      await fetchUserProfile();
      return { success: true };
    } catch (error) {
      return handleAPIError(error);
    }
  };

  // Change password
  const changePassword = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/set_password/", data, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      return { success: true };
    } catch (error) {
      return handleAPIError(error);
    }
  };

  return {
    user,
    loading,
    errorMsg,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    handleAPIError,
  };
};

export default useAuth;