import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

interface NumberInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: number;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NumberInput({
  name,
  label,
  placeholder,
  value,
  readOnly,
  onChange,
}: NumberInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      <label className="flex flex-col h-full">
        {label}
        <motion.input
          type="number"
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          {...register(name, { required: true, min: 0 })}
          onChange={onChange}
          className="text-white w-full rounded p-2 border border-transparent outline-none focus:border-indigo-500 focus:shadow-md transition-all"
          whileFocus={{
            borderColor: "rgba(99, 102, 241, 1)",
            boxShadow: "0 0 8px rgba(99, 102, 241, 0.8)",
          }}
        />
        {errors[name] && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
      </label>
    </div>
  );
}
