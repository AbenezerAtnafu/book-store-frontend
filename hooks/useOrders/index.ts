import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

const fetchOrders = async (limit = 10) => {
  const parsed = await axios.get("/orders");

  return parsed.data;
};

const useOrders = (limit) => {
  return useQuery({
    queryKey: ["orders", limit],
    queryFn: () => fetchOrders(limit),
  });
};

export { useOrders, fetchOrders };
