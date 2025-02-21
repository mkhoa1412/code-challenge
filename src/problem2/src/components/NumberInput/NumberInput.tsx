import { useState, type ChangeEvent } from "react";
import { Input } from "../ui/input";

export default function NumberInput(props: Props) {
  const { className, defaultValue, onChange } = props;

  const [internalValue, setInternalValue] = useState(String(defaultValue));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange(Number(newValue) || 0);
  };

  return (
    <Input
      className={className}
      type="number"
      value={internalValue}
      onChange={handleChange}
      min={0}
    />
  );
}

export interface Props {
  className?: string;
  defaultValue: number;
  onChange: (newValue: number) => void;
}
