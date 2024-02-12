"use client";

import LayoutAuthenticated from "@/app/_components/LayoutAuthenticated";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchProfile = async () => {
    setLoading(true);
    const response = await axios.get("/auth/profile");

    if (response.status == 200) {
      return response.data;
    } else {
      router.push("/login");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCover(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAuth = await fetchProfile();

    try {
      const response = await axios.post("/books", {
        title,
        price,
        author,
        cover,
        tags: "",
      });

      if (response.data.status === 201) {
        toast({
          description: "You have successfully created the book",
        });
      } else if (response.data.status === 400) {
        toast({
          description: "Something went wrong",
          variant: "destructive",
        });
      }

      const { data } = response;

      setLoading(false);
      router.push("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <LayoutAuthenticated>
      <div className="container mx-auto mt-10">
        <div className="rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4">Post a Book</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price in Points
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Author
              </label>
              <input
                type="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                accept="image/*"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              Post Book
            </button>

            {loading && (
              <div className="mt-4">
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </LayoutAuthenticated>
  );
};

export default Page;
