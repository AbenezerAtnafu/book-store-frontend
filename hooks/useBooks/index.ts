import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

const fetchBooks = async (limit = 10) => {
  const parsed = await axios.get("/books");

  return parsed.data;
};

const useBooks = (limit) => {
  return useQuery({
    queryKey: ["books", limit],
    queryFn: () => fetchBooks(limit),
  });
};

export { useBooks, fetchBooks };
