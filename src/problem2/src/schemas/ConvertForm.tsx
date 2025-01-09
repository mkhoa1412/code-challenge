import { z } from "zod";

export const ConvertFormSchema = z.object({
  from: z.string().refine((val) => parseFloat(val) > 0, {
    message: "Value must be greater than 0",
  }),
  to: z.string().refine((val) => parseFloat(val) > 0, {
    message: "Value must be greater than 0",
  }),
  currencyFrom: z.string(),
  currencyTo: z.string(),
});
