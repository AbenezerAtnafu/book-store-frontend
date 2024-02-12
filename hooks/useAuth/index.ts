import axios from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { useEffect } from "react";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/auth/user", () =>
    axios
      .get("/auth/user")
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 409) {
          throw error;
        }

        router.push("/orders");
      })
  );

  const { data: csrf } = axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const login = async ({ setErrors, setStatus, ...props }) => {
    // await csrf()

    setErrors([]);
    setStatus(null);

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);

    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return { user, csrf, isLoading, login, logout };
};
