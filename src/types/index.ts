import { Product } from "@/generated/prisma";

export type ModProduct = Product & {
  rating: string;
  price: string;
};
