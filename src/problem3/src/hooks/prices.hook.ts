import { useEffect, useState } from "react";

// Hook to fetch token prices
export const usePrices = () => {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/token-prices"); // Replace with actual API endpoint

        const data = await response.json();

        setPrices(data);
      } catch (error) {
        console.error("Error fetching token prices:", error);
      }
    };

    fetchPrices();
  }, []);

  return prices;
};
