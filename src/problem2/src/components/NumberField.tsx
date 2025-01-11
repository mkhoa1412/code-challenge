import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HTMLProps } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  inputProps?: HTMLProps<HTMLInputElement>;
}

export const NumberField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  inputProps,
}: IProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              className="w-full rounded-xl border-gray-600 px-4 py-6 placeholder:text-xl md:text-2xl"
              placeholder={placeholder}
              {...inputProps}
              {...field}
              value={
                // If the value is empty, set it to "0"
                field.value || "0"
              }
              onChange={(e) => {
                let value = e.target.value;
                const numberRegex = /^[0-9]*\.?[0-9]*$/;

                if (numberRegex.test(value)) {
                  // Remove leading zeros if the value is not a decimal"
                  if (value.startsWith("0") && !value.startsWith("0.")) {
                    value = value.replace(/^0+/, "") || "0";
                  }

                  field.onChange(value);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
