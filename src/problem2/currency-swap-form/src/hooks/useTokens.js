import { useState, useEffect } from "react";
import { fetchTokenPrices } from "../api/fetchTokenPrices";

const useTokens = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const loadTokens = async () => {
      const data = await fetchTokenPrices();
      if (data) {
        setTokens(
          data.map((token) => ({
            currency: token.currency,
            imageUrl: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`,
            price: token.price
          }))
        );
      }
    };
    loadTokens();
  }, []);

  return tokens;
};

export default useTokens;
