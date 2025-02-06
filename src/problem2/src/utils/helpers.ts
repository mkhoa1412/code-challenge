import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const PRESICION = 8;

export const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 768px)").matches;

export const isDesktop =
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 768px)").matches &&
  window.matchMedia("(max-width: 1280px)").matches;

export const isLargeDektopScreen =
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1280px)").matches;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatBalance = (
  value: number,
  precision: number = PRESICION
): number => {
  const factor = Math.pow(10, precision);

  // Convert value to a string to handle large numbers accurately
  const bigValue = BigInt(Math.round(value * factor));
  const bigFactor = BigInt(factor);

  // Convert result back to a number
  return Number(bigValue) / Number(bigFactor);
};

export function isEmpty(value: unknown): boolean {
  if (value == null) return true; // Handles null and undefined
  if (typeof value === "object") {
    // Check for arrays or objects
    return Object.keys(value as object).length === 0;
  }
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}
