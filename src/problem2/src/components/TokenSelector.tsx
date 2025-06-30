import type { TokenSelectProps } from "@/types";
import { useState } from "react";

export default function TokenSelector({
  value,
  onChange,
  tokens,
  placeholder = "Select token",
}: TokenSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Selected token */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#2A2C3D] text-left px-4 py-2 rounded-xl flex items-center gap-2"
      >
        {value ? (
          <>
            <img src={value.logoURI} alt={value.symbol} className="w-5 h-5" />
            <span>{value.symbol}</span>
          </>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <div className="absolute mt-2 z-10 w-full max-h-60 overflow-y-auto bg-[#1E1F2F] rounded-xl shadow-lg">
          {tokens.map((token) => (
            <div
              key={token.symbol}
              onClick={() => {
                onChange(token);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-[#2A2C3D] cursor-pointer flex items-center gap-2"
            >
              <img src={token.logoURI} alt={token.symbol} className="w-5 h-5" />
              <span>{token.symbol}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
