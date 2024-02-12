import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const router = useRouter();
  const client = useQueryClient();

  console.log(client);

  return (
    <nav className="w-dull sticky inset-x-0 top-0 z-30 h-14  bg-white/75 backdrop-blur-lg transition-all ">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between ">
          <Link href="/" className="z-40 flex font-semibold">
            <span>nets.</span>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: "link",
                })}
                href="/"
              >
                Books
              </Link>
              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: "link",
                })}
                href="/books/create"
              >
                Add Book
              </Link>

              <Link
                className={buttonVariants({
                  size: "sm",
                })}
                href="/orders"
              >
                My Orders
              </Link>
            </>
            {client.getQueryData("isAuthenticated") ? (
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                Sign out
              </Button>
            ) : (
              <Link
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
                href="/login"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
