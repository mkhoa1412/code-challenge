import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { CurrencyItem } from "@/model";
import { CurrencyImage } from "../CurrencyImage";

export function CurrencyCbo(props: CurrencyCboProps) {
  const { list, selectedCurrency, onChangeCurrency } = props;

  const [open, setOpen] = useState(false);

  let buttonContentEl = <>Select...</>;

  if (selectedCurrency) {
    const item = list.find(
      (item) => item.currency === selectedCurrency.currency
    );

    if (item) {
      buttonContentEl = (
        <div className="flex items-center gap-2">
          <CurrencyImage currency={item.currency} />
          {item.currency}
        </div>
      );
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {buttonContentEl}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>Empty</CommandEmpty>
            <CommandGroup>
              {list.map((item) => (
                <CommandItem
                  key={item.currency}
                  value={item.currency}
                  onSelect={(currentValue) => {
                    const selected = list.find(
                      (item) => item.currency === currentValue
                    );
                    if (!selected) return;

                    onChangeCurrency(selected);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-1">
                    <CurrencyImage currency={item.currency} />
                    {item.currency}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedCurrency?.currency === item.currency
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export interface CurrencyCboProps {
  list: CurrencyItem[];
  selectedCurrency?: CurrencyItem;
  onChangeCurrency: (newCurrency: CurrencyItem) => void;
}
