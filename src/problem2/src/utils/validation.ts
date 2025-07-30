import { z } from 'zod'

// Validation schemas
export const swapFormSchema = z.object({
  fromToken: z.string().min(1, 'Please select a token to swap from'),
  toToken: z.string().min(1, 'Please select a token to swap to'),
  fromAmount: z.string()
    .min(1, 'Please enter an amount to swap')
    .refine((val: string) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Amount must be a valid positive number'
    }),
  toAmount: z.string()
    .min(1, 'Calculated amount is required')
    .refine((val: string) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Calculated amount must be valid'
    })
}).refine((data: { fromToken: string; toToken: string }) => data.fromToken !== data.toToken, {
  message: 'Cannot swap the same token',
  path: ['toToken']
})

export type SwapFormData = z.infer<typeof swapFormSchema>

export interface ValidationError {
  field: string
  message: string
}

export const validateSwapForm = (data: Partial<SwapFormData>): {
  isValid: boolean
  errors: ValidationError[]
} => {
  try {
    swapFormSchema.parse(data)
    return { isValid: true, errors: [] }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errors: ValidationError[] = error.errors.map((err: z.ZodIssue) => ({
        field: err.path.join('.'),
        message: err.message
      }))
      return { isValid: false, errors }
    }
    return {
      isValid: false,
      errors: [{ field: 'general', message: 'Validation failed' }]
    }
  }
}

// Individual field validators
export const validateAmount = (amount: string): string | null => {
  if (!amount || amount.trim() === '') {
    return 'Amount is required'
  }

  const numAmount = Number(amount)
  if (isNaN(numAmount)) {
    return 'Amount must be a valid number'
  }

  if (numAmount <= 0) {
    return 'Amount must be greater than 0'
  }

  if (numAmount > 1000000000) {
    return 'Amount is too large'
  }

  return null
}

export const validateTokenSelection = (token: string, label: string): string | null => {
  if (!token || token.trim() === '') {
    return `Please select a ${label.toLowerCase()} token`
  }
  return null
}

export const validateTokenPair = (fromToken: string, toToken: string): string | null => {
  if (fromToken && toToken && fromToken === toToken) {
    return 'Cannot swap the same token'
  }
  return null
}