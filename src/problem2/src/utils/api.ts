export interface Token {
  currency: string;
  date: string;
  price: number;
}

export const fetchTokenPrices = async (): Promise<Array<Token>> => {
  try {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    const list = await response.json();
    const seen = new Set();
    const uniqueList = list.filter((item: Token) => {
      if (seen.has(item.currency)) {
        return false;
      }
      seen.add(item.currency);
      return true;
    });
    return uniqueList;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return [];
  }
};
