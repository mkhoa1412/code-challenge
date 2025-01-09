import { NumberField } from "@/components/NumberField";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface IFormProps {
  from: string;
  to: string;
}

export const Converter = () => {
  const form = useForm<IFormProps>({
    defaultValues: {
      from: "0",
      to: "0",
    },
  });

  return (
    <Form {...form}>
      <form className="flex items-center gap-4">
        <NumberField control={form.control} name="from" placeholder="From" />

        <NumberField control={form.control} name="to" placeholder="To" />
      </form>
    </Form>
  );
};
