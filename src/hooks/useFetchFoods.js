import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchFoods = (
  currentPage,
  priceRange,
  selectedCategory,
  searchQuery,
  sortOrder
) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);

      const url = `/foods/?price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${sortOrder}`;

      try {
        const { data } = await apiClient.get(url);

        setFoods(data.results);

        const pageSize = data.results.length < 10 ? 10 : data.results.length;

        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [currentPage, priceRange, selectedCategory, searchQuery, sortOrder]);

  return { foods, loading, totalPages };
};

export default useFetchFoods;