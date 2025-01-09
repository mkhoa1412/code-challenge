import { CryptoSelect } from "@/components/CryptoSelect";
import { NumberField } from "@/components/NumberField";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface IFormProps {
  from: string;
  to: string;
  coinFrom: string;
}

export const Converter = () => {
  const form = useForm<IFormProps>({
    defaultValues: {
      from: "0",
      to: "0",
      coinFrom: "remix",
    },
  });
  const { control, setValue } = form;

  return (
    <Form {...form}>
      <form className="flex items-center gap-4">
        <NumberField control={control} name="from" placeholder="From" />

        <CryptoSelect control={control} name="coinFrom" setValue={setValue} />

        <NumberField control={form.control} name="to" placeholder="To" />
      </form>
    </Form>
  );
};
