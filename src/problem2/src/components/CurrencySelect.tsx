import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, ChevronDown } from "lucide-react";
import { ICurrency } from "@/types/Currency";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
  label?: string;
  defaultValue: PathValue<T, Path<T>>;
  currencies: ICurrency[];
  disabled: boolean;
}

export const CurrencySelect = <T extends FieldValues>({
  control,
  name,
  label,
  setValue,
  defaultValue,
  currencies,
  disabled,
}: IProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}

          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "flex min-w-[100px] items-center gap-2 rounded-xl px-4 py-6 text-xl",
                    !field.value && "text-muted-foreground",
                  )}
                  disabled={disabled}
                >
                  <img
                    src={`/token-icons/${field.value}.svg`}
                    alt={field.value}
                    className="h-6 w-6 rounded-full"
                  />
                  {currencies.find((item) => item.currency === field.value)
                    ?.currency ?? defaultValue}
                  <ChevronDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search" className="h-9" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {currencies.map((item) => (
                      <CommandItem
                        value={item.currency}
                        key={item.currency}
                        onSelect={() => {
                          setValue(
                            name,
                            item.currency as PathValue<T, Path<T>>,
                          );
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-2.5 text-lg"
                      >
                        <img
                          src={`/token-icons/${item.currency}.svg`}
                          alt={field.value}
                          className="h-5 w-5 rounded-full"
                        />
                        {item.currency}
                        <Check
                          className={cn(
                            "ml-auto",
                            item.currency === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
