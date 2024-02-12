"use client";

import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LayoutAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/auth/profile");

      console.log(response.status);

      if (response.status == 200) {
        // setProfile(data);
      } else {
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    }
  };

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return <div>{children}</div>;
};

export default LayoutAuthenticated;
