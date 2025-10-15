import ThemeToggle from "./theme-toggle";
import { EllipsisVertical, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Nav = () => (
  <>
    <ThemeToggle />
    <Button asChild variant="ghost">
      <Link href="/cart">
        <ShoppingCartIcon /> Cart
      </Link>
    </Button>
    <Button asChild>
      <Link href="/sign-in">
        <UserIcon /> Sign In
      </Link>
    </Button>
  </>
);

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-2">
        <Nav />
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="p-5 pb-0">Menu</SheetTitle>
            <div className="p-5 flex flex-col items-start gap-5">
              <Nav />
            </div>
          <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
export default Menu;
