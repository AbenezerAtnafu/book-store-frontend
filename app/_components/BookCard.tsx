"use client";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

export interface Book {
  id: string;
  price: string;
  title: string;
  cover: string;
  creator?: User | null;
}

export interface User {
  id: string;
  username: string;
}

const BookCard = ({ book }) => {
  const [profile, setProfile] = useState();
  const router = useRouter();

  const fetchProfile = async () => {
    const response = await axios.get("/auth/profile");

    if (response.status == 200) {
      setProfile(response.data);
      return response.data;
    } else {
      router.push("/login");
    }
  };

  const orderBook = async (id) => {
    const isAuth = await fetchProfile();
    const response = await axios.post("/orders", { bookId: book.id });

    if (response.data.status === 201) {
      toast({
        description: "You have successfully ordered the book",
      });
    } else if (response.data.status === 400) {
      toast({
        description: "You don't have enough points to order this book",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-3 w-[150px] shrink-0 rounded-md hover:shadow-md pb-2">
      <span data-state="closed">
        <div className="overflow-hidden rounded-md">
          <img
            src={book.cover}
            alt="book-cover"
            loading="lazy"
            width={150}
            height={150}
            className="h-fit w-fit object-cover transition-all hover:scale-105 aspect-square"
            style={{ color: "transparent" }}
          />
        </div>
      </span>
      <div className="space-y-1 text-sm text-left pl-2">
        <h3 className="font-medium leading-none">{book.title}</h3>
        <p className="text-xs text-muted-foreground">
          {book.price == 0 ? "Free" : `${book.price} points`}
        </p>
      </div>
      <div className="  bg-white z-50">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size={"sm"}
              variant={"secondary"}
              // onClick={() => orderBook(book.id)}
            >
              Order Now
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you really want to order this book?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => orderBook(book.id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default BookCard;
