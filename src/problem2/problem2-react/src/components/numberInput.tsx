import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

interface NumberInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NumberInput({
  name,
  label,
  placeholder,
  value,
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
          {...register(name, {
            required: "This field is required",
            min: { message: "must be greater than 0", value: 0 },
            onChange: (e) => onChange(e),
          })}
          className="text-white w-full rounded p-2 border border-transparent outline-none focus:border-indigo-500 focus:shadow-md transition-all"
          whileFocus={{
            borderColor: "rgba(99, 102, 241, 1)",
            boxShadow: "0 0 8px rgba(99, 102, 241, 0.8)",
          }}
        />
        <AnimatePresence>
          {errors[name] && (
            <motion.span
              layout
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="text-red-500 font-bold text-sm"
            >
              {errors[name]?.message?.toString()}
            </motion.span>
          )}
        </AnimatePresence>
      </label>
    </div>
  );
}
