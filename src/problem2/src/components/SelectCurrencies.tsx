import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TOKEN_IMAGE_URL = "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";

interface Currency {
  currency: string;
  price: number;
}

interface Props {
  currencyList: Currency[];
  selectedCurrency: string;
  onSelect: (currency: string) => void;
}

export function SelectCurrencies({ currencyList, selectedCurrency, onSelect }: Props) {
  console.log(selectedCurrency);

  return (
    <Select onValueChange={onSelect} value={selectedCurrency}>
      <SelectTrigger className="w-[200px] bg-[#b1b1b53b] shadow-none flex items-center gap-2">
        <img
          src={`${TOKEN_IMAGE_URL}${selectedCurrency}.svg`}
          alt={selectedCurrency}
          width={20}
          height={20}
          className="rounded-full"
        />
        <SelectValue>
          {selectedCurrency} 
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-[#211e41b8] bg-cover">
        <SelectGroup>
          {currencyList.map((currency, index) => (
            <SelectItem key={index} value={currency.currency}>
              {currency.currency}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
