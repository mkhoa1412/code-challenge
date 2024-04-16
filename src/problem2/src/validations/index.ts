import { z } from "zod"

export const calculateCurrencyExchangeSchema = z.object({
  amount: z.number(),
  from: z.string(),
  to: z.string(),
})

export type CalculateCurrencyExchangeSchema = z.infer<
  typeof calculateCurrencyExchangeSchema
>
