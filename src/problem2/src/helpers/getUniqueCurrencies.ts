import { ICurrency } from "@/types/Currency";

export const getUniqueCurrencies = (currenciesList: ICurrency[]) => {
  const uniqueList = new Map();

  for (const item of currenciesList) {
    const { currency, date } = item;

    if (!uniqueList.has(currency)) {
      uniqueList.set(currency, item);
    } else {
      // Compare the existing date with the current item's date
      const existingDate = new Date(uniqueList.get(currency).date);
      const currentDate = new Date(date);

      // If the current entry is newer, update the map
      if (currentDate > existingDate) {
        uniqueList.set(currency, item);
      }
    }
  }

  return Array.from(uniqueList.values());
};
