import { useFormContext } from "react-hook-form";

interface NumberInputProps {
  name: string;
  label?: string;
  placeholder?: string;
}
export default function NumberInput({
  name,
  label,
  placeholder,
}: NumberInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <label>
      {label}
      <input
        type="number"
        placeholder={placeholder}
        {...register(name, { required: true, min: 0 })}
      />
    </label>
  );
}
