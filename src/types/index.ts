import { Product } from "@/generated/prisma";
import { cartItemSchema, insertCartSchema } from "@/lib/validators";
import z from "zod";

export type ModProduct = Product & {
  rating: string;
  price: string;
};

export type Cart = z.infer<typeof insertCartSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;
