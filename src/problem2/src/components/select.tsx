import React, { SelectHTMLAttributes } from "react"

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Array<string>
}

export const Select = ({ options, ...rest }: SelectProps) => {
  return (
    <select {...rest}>
      {options.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  )
}
