import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
