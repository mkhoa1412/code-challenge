import { useEffect, useState } from "react"
import { BASE_URL_EXCHANGE_API, VITE_API_EXCHANGE_KEY } from "../constants"

export function useGetRatesOptions() {
  const [options, setOptions] = useState<Array<string>>([])

  useEffect(() => {
    const getRates = async () => {
      // fetch the data from API
      const response = await fetch(
        `${BASE_URL_EXCHANGE_API}/${VITE_API_EXCHANGE_KEY}/latest/USD`
      ).then((response) => response.json())

      // save the rates in the state
      if (response.result === "success") {
        setOptions(Object.keys(response.conversion_rates))
      }
    }

    getRates()
  }, [])

  return {
    options,
  } as const
}
