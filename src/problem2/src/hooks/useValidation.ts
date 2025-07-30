import { useState, useCallback } from 'react'
import { ValidationError } from '../utils/validation'

interface UseValidationReturn {
  errors: Record<string, string[]>
  hasErrors: boolean
  setFieldError: (field: string, error: string | null) => void
  setFieldErrors: (field: string, errors: string[]) => void
  setErrors: (errors: ValidationError[]) => void
  clearErrors: () => void
  clearFieldErrors: (field: string) => void
  getFieldErrors: (field: string) => string[]
}

export const useValidation = (): UseValidationReturn => {
  const [errors, setErrorsState] = useState<Record<string, string[]>>({})

  const setFieldError = useCallback((field: string, error: string | null) => {
    setErrorsState(prev => ({
      ...prev,
      [field]: error ? [error] : []
    }))
  }, [])

  const setFieldErrors = useCallback((field: string, fieldErrors: string[]) => {
    setErrorsState(prev => ({
      ...prev,
      [field]: fieldErrors
    }))
  }, [])

  const setErrors = useCallback((validationErrors: ValidationError[]) => {
    const errorsByField: Record<string, string[]> = {}

    validationErrors.forEach(error => {
      if (!errorsByField[error.field]) {
        errorsByField[error.field] = []
      }
      errorsByField[error.field].push(error.message)
    })

    setErrorsState(errorsByField)
  }, [])

  const clearErrors = useCallback(() => {
    setErrorsState({})
  }, [])

  const clearFieldErrors = useCallback((field: string) => {
    setErrorsState(prev => ({
      ...prev,
      [field]: []
    }))
  }, [])

  const getFieldErrors = useCallback((field: string): string[] => {
    return errors[field] || []
  }, [errors])

  const hasErrors = Object.values(errors).some(fieldErrors => fieldErrors.length > 0)

  return {
    errors,
    hasErrors,
    setFieldError,
    setFieldErrors,
    setErrors,
    clearErrors,
    clearFieldErrors,
    getFieldErrors
  }
}