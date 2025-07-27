import Joi from "joi"
import { Request, Response, NextFunction } from "express"
import { ValidationError, ValidatedRequest } from "../types"

// User registration validation
const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
  username: Joi.string().min(3).max(50).alphanum().required().messages({
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username cannot exceed 50 characters",
    "string.alphanum": "Username can only contain letters and numbers",
    "any.required": "Username is required",
  }),
})

// User login validation
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
})

// Math action validation
const actionSchema = Joi.object({
  action: Joi.string().valid("plus", "minus").required().messages({
    "any.only": 'Action must be either "plus" or "minus"',
    "any.required": "Action is required",
  }),
  operand1: Joi.number().integer().min(-1000).max(1000).required().messages({
    "number.base": "Operand1 must be a number",
    "number.integer": "Operand1 must be an integer",
    "number.min": "Operand1 must be at least -1000",
    "number.max": "Operand1 cannot exceed 1000",
    "any.required": "Operand1 is required",
  }),
  operand2: Joi.number().integer().min(-1000).max(1000).required().messages({
    "number.base": "Operand2 must be a number",
    "number.integer": "Operand2 must be an integer",
    "number.min": "Operand2 must be at least -1000",
    "number.max": "Operand2 cannot exceed 1000",
    "any.required": "Operand2 is required",
  }),
})

// Validation middleware factory
const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (error) {
      const errors: ValidationError[] = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }))

      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      })
      return
    }

    ;(req as ValidatedRequest).validatedData = value
    next()
  }
}

// Math operation validator
const validateMathOperation = (
  action: string,
  operand1: number,
  operand2: number,
  result: number,
): boolean => {
  let expectedResult: number

  switch (action) {
    case "plus":
      expectedResult = operand1 + operand2
      break
    case "minus":
      expectedResult = operand1 - operand2
      break
    default:
      return false
  }

  return expectedResult === result
}

// Email format validator
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Username validator
const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9]{3,50}$/
  return usernameRegex.test(username)
}

// Password strength validator
const isStrongPassword = (password: string): boolean => {
  // At least 6 characters, contains letter and number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/
  return passwordRegex.test(password)
}

export {
  registerSchema,
  loginSchema,
  actionSchema,
  validate,
  validateMathOperation,
  isValidEmail,
  isValidUsername,
  isStrongPassword,
}
