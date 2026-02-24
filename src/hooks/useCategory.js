import { useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        authApiClient
        .get("/categories")
        .then((res) => setCategories(res.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }, []);

    return { categories, setCategories, loading, error };
};
export default useCategory;