"use client";

import { useBooks } from "@/hooks";
import MaxWidthWrapper from "./_components/MaxWidthWrapper";
import Loading from "./_components/loading";
import BookCard from "./_components/BookCard";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

export default function Home() {
  const { data, isLoading, isError, isSuccess } = useBooks(10);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-10 flex flex-col items-center justify-center text-center sm:mt-20">
        <div className="hover-bg-white/50 mx-auto mb-4 flex max-w-full items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300">
          <p className="text-sm font-semibold text-gray-700">
            books is now public
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Get your books <span className="text-blue-600">right now</span> on
          your hand.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          The best place to find the books you need. We have a wide variety of
          books for you to choose from.
        </p>

        {/* books */}

        <div className="flex flex-col text-left w-full mt-10 mb-5">
          <h2 className="text-2xl font-bold text-gray-800">New Arrivals</h2>
          <p className="text-sm text-gray-600">
            Find the books that just arrived
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-4 lg:grid-cols-7">
          {data?.map((book) => (
            <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
              <BookCard key={book.id} book={book} />
            </li>
          ))}
        </ul>
      </MaxWidthWrapper>
    </>
  );
}
