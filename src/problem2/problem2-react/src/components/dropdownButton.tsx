import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

export type CurrencyListType = {
  currency: string;
  date: string;
  price: number;
};

type DropdownInputProps = {
  label?: string;
  name: string;
  list: CurrencyListType[];
  onChange: (currency: CurrencyListType) => void;
  defaultValue?: string;
};

export default function DropdownButton({
  label,
  name,
  list,
  onChange,
  defaultValue,
}: DropdownInputProps) {
  const { setValue } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyListType | null>(null);

  useEffect(() => {
    if (defaultValue) {
      const defaultCurrency = list.find(
        (item) => item.currency === defaultValue
      );
      if (defaultCurrency) {
        setSelectedCurrency(defaultCurrency);
        setValue(name, defaultValue);
      }
    }
  }, [defaultValue, list, name, setValue]);

  const handleSelect = (currency: CurrencyListType) => {
    setSelectedCurrency(currency);
    onChange(currency);
    setValue(name, currency.currency);
    setIsOpen(false);
  };
  const containerVariants = {
    hidden: { height: 0 },
    visible: {
      height: "320px",
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <div className="relative w-1/4">
      <label className="text-black">
        {label}
        <button
          type="button"
          className="text-left bg-slate-400 bg-opacity-30 rounded-md shadow-sm flex justify-center items-center w-full py-2 "
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCurrency ? (
            <>
              <img
                src={`/${selectedCurrency.currency}.svg`}
                alt={selectedCurrency.currency}
                className="inline-block w-4 h-4 mr-2"
              />
              {selectedCurrency.currency}
            </>
          ) : (
            "Select currency"
          )}
        </button>
      </label>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-auto"
          >
            {list.map((item) => (
              <motion.li
                key={item.currency}
                onClick={() => handleSelect(item)}
                variants={itemVariants}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                <img
                  src={`/${item.currency}.svg`}
                  alt={item.currency}
                  className="inline-block size-10 mr-2"
                />

                <div>
                  <p className="font-bold">{item.currency}</p>
                  <span className="block text-sm text-slate-500">
                    {item.price}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
