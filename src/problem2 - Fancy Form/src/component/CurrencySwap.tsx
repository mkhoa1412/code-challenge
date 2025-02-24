import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CurrencyInput from "./CurrencyInput";

export interface ICoin {
  currency: string;
  date: Date;
  price: number;
}

const CurrencySwap: React.FC = () => {
  const [amount1, setAmount1] = useState<number>(0);
  const [coin1, setCoin1] = useState<ICoin>();
  const [amount2, setAmount2] = useState<number>(0);
  const [coin2, setCoin2] = useState<ICoin>();
  const [listCoin, setListCoin] = useState<ICoin[]>();

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL);
      const coins = response.data;
      const filteredCoins = filterLatestCoins(coins);
      setListCoin(filteredCoins);
      setCoin1(filteredCoins[0]);
      setCoin2(filteredCoins[0]);
    } catch (error) {
      console.error("Error fetching token prices", error);
    }
  };

  const filterLatestCoins = (coins: ICoin[]): ICoin[] => {
    return coins.reduce((acc: ICoin[], coin: ICoin) => {
      const existingCoin = acc.find((c) => c.currency === coin.currency);
      if (!existingCoin || new Date(coin.date) < new Date(existingCoin.date)) {
        return acc.filter((c) => c.currency !== coin.currency).concat(coin);
      }
      return acc;
    }, []);
  };

  const convert = () => {
    if (!coin1 || !coin2 || !amount1) {
      setAmount2(0);
      return;
    }
    const newAmount2 = (coin1.price * amount1) / coin2.price;
    setAmount2(newAmount2);
  };

  const handleAmount1Change = (value: number) => {
    setAmount1(value);
  };

  const handleCoin1Change = (coin: ICoin) => {
    setCoin1(coin);
  };

  const handleCoin2Change = (coin: ICoin) => {
    setCoin2(coin);
  };

  useEffect(() => {
    convert();
  }, [amount1, coin1, coin2]);

  const swapCurrencies = () => {
    setCoin1(coin2);
    setCoin2(coin1);
    setAmount1(amount2);
    setAmount2(amount1);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto rounded-x space-y-4 text-4xl">
      <div className="mt-40">
        <CurrencyInput
          amount={amount1}
          coin={coin1}
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCoin1Change}
          listCoin={listCoin}
        />
        <div className="flex justify-center my-4">
          <button
            className="p-2 cursor-pointer bg-white rounded-2xl"
            onClick={swapCurrencies}
          >
            <FontAwesomeIcon icon={faRetweet} />
          </button>
        </div>
        <div className="mt-10">
          <CurrencyInput
            amount={amount2}
            coin={coin2}
            onCurrencyChange={handleCoin2Change}
            listCoin={listCoin}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencySwap;
