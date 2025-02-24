import { useState } from "react";
import { ICoin } from "./CurrencySwap";

interface CurrencyInputProps {
  amount: number;
  coin?: ICoin;
  onAmountChange?: (value: number) => void;
  onCurrencyChange: (coin: ICoin) => void;
  listCoin?: ICoin[];
  readOnly?: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount,
  coin,
  onAmountChange,
  onCurrencyChange,
  listCoin,
  readOnly = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onAmountChange) {
      onAmountChange(parseFloat(e.target.value));
    }
  };

  const handleCurrencySelect = (selectedCoin: ICoin) => {
    setIsOpen(false);
    onCurrencyChange(selectedCoin);
  };

  return (
    <div className="flex items-center space-x-4 mb-10">
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className="w-full px-3 py-2 border bg-white border-gray-300 rounded-2xl"
        readOnly={readOnly}
      />
      <div className="relative w-64">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.VITE_TOKEN_ICON_BASE}${coin?.currency}.svg`}
              alt={coin?.currency}
              className="w-10 h-10 rounded-full"
            />
            <span>{coin?.currency}</span>
          </div>
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-150 overflow-auto">
            {listCoin?.map((coin) => (
              <li
                key={coin.currency}
                onClick={() => handleCurrencySelect(coin)}
                className="flex items-center gap-2 px-4 py-4 cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={`${import.meta.env.VITE_TOKEN_ICON_BASE}${coin.currency}.svg`}
                  alt={coin.currency}
                  className="w-10 h-10 rounded-full"
                />
                <span>{coin.currency}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CurrencyInput;
