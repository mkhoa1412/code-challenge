import { useForm, Controller } from "react-hook-form"
import { useGetRatesOptions } from "./hooks/use-get-rates"
import { useCalculateOutput } from "./hooks/use-calculate-output"
import { CalculateCurrencyExchangeSchema } from "./validations"
import "./App.css"
import { Select } from "./components/select"
import CurrencyInput from "react-currency-input-field"

function App() {
  const { options } = useGetRatesOptions()
  const { output, calculateOutput } = useCalculateOutput()

  const form = useForm<CalculateCurrencyExchangeSchema>({
    defaultValues: {
      amount: 0,
      from: "USD",
      to: "EUR",
    },
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = form

  const onSubmit = (values: CalculateCurrencyExchangeSchema) => {
    calculateOutput(values)
  }

  const watchFrom = watch("from")

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-amount">
          <label>Amount:</label>
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <CurrencyInput
                intlConfig={{ locale: "en-US", currency: watchFrom }}
                allowDecimals
                allowNegativeValue={false}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          {errors.amount && (
            <p style={{ color: "red" }}>{errors.amount.message}</p>
          )}
        </div>
        <div className="input-from">
          <label>From:</label>
          <Controller
            control={control}
            name="from"
            render={({ field }) => (
              <Select
                options={options}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.from && <p style={{ color: "red" }}>{errors.from.message}</p>}
        </div>
        <div className="input-to">
          <label>To:</label>
          <Controller
            control={control}
            name="to"
            render={({ field }) => (
              <Select
                options={options}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {errors.to && <p style={{ color: "red" }}>{errors.to.message}</p>}
        </div>
        <button className="btn" type="submit">
          Calculate
        </button>
      </form>

      <div className="output">
        <label>Output: {output}</label>
      </div>
    </div>
  )
}

export default App
