import { useState } from "react"
import { BASE_URL_EXCHANGE_API, VITE_API_EXCHANGE_KEY } from "../constants"
import { CalculateCurrencyExchangeSchema } from "../validations"

export function useCalculateOutput() {
  const [output, setOutput] = useState<number>(0)

  const calculateOutput = async (values: CalculateCurrencyExchangeSchema) => {
    const { amount, from, to } = values

    const response = await fetch(
      `${BASE_URL_EXCHANGE_API}/${VITE_API_EXCHANGE_KEY}/latest/${from}`
    ).then((response) => response.json())
    const fetchedRates = response.conversion_rates

    // calculate and store the result
    const currencyRate = fetchedRates[to]
    const output = Number(amount) * currencyRate

    console.log({ output })

    setOutput(output)
  }

  return { output, calculateOutput } as const
}
