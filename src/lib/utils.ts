import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

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

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error instanceof ZodError && error.name === "ZodError") {
    const fieldErrors = error.issues.map((field) => field.message);
    return fieldErrors.join(". \n");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const field = error.meta?.target
      ? (error.meta.target[0] as string)
      : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exist`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}
