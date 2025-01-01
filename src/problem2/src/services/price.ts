import { get } from "@/helpers/api";

const getPrices = () =>
  get<IPrice[]>("https://interview.switcheo.com/prices.json");

export const priceService = { getPrices };
