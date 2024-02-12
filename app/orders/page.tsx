"use client";

import { useOrders } from "@/hooks";
import { Book, User } from "../_components/BookCard";
import LayoutAuthenticated from "../_components/LayoutAuthenticated";
import Loading from "../_components/loading";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";
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
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";

enum OrderStatus {
  Active = "Active",
  Cancelled = "Cancelled",
}

export interface Order {
  id: string;
  user?: User;
  book?: Book;
  orderStatus: OrderStatus;
}

const Page = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useOrders(10);

  const cancelOrder = async (id) => {
    const response = await axios.put(`/orders/cancel/${id}`);

    if (response.data.status === 200) {
      toast({
        description: "You have successfully cancelled the order",
      });
    } else if (response.data.status === 400) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    }
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <LayoutAuthenticated>
      <MaxWidthWrapper className="mb-12 mt-10 flex flex-col items-center justify-center text-center sm:mt-20">
        <div className="container mx-auto">
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Book</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((order: Order) => (
                <tr key={order.id}>
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.user?.username}</td>
                  <td className="px-4 py-2">{order.book?.title}</td>
                  <td className="px-4 py-2">{order.book?.price}</td>
                  {order.orderStatus == OrderStatus.Active ? (
                    <td className="px-4 py-2 text-green-400">
                      {order.orderStatus}
                    </td>
                  ) : (
                    <td className="px-4 py-2 text-red-400">
                      {order.orderStatus}
                    </td>
                  )}
                  {order.orderStatus == OrderStatus.Active && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size={"sm"} variant={"destructive"}>
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Do you really want to cancel this order ?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => cancelOrder(order.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MaxWidthWrapper>
    </LayoutAuthenticated>
  );
};

export default Page;
