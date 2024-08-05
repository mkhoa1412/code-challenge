import { FormProvider, useForm } from "react-hook-form";
import NumberInput from "./numberInput";

export default function CurrencyForm() {
  const methods = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NumberInput name="currency" label="Ammount to send" />
        <NumberInput name="currency" label="Ammount to receive" />
        <button type="button">Swap</button>
      </form>
    </FormProvider>
  );
}
