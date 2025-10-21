import { Decimal } from "@/generated/prisma/runtime/library";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a regular js onject
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Convert only Decimals to string
// export function serializeDecimals<T extends object>(items: T[]) {
//   return items.map((item) => {
//     const obj: any = {};
//     for (const key in item) {
//       const val = (item as any)[key];
//       obj[key] = val && val instanceof Decimal ? val.toString() : val;
//     }
//     return obj;
//   });
// }

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}
