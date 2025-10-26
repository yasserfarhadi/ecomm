"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: { item: CartItem }) => {
  const { push } = useRouter();
  async function addToCartHandler() {
    const res = await addItemToCart(item);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(`${item.name} added to cart`, {
      action: {
        label: "Go to cart",
        onClick: () => push("/cart"),
      },
    });
  }

  return (
    <Button className="w-full" type="button" onClick={addToCartHandler}>
      <Plus /> Add to Cart
    </Button>
  );
};

export default AddToCart;
