import React from 'react'

export default function InputNumber({register, onChange, name, id, placeholder}) {
  return (
    <input
      className='border border-gray-300 rounded-md p-1 focus:outline-none text-sm'
      id={id}
      type="number"
      {...register(name)}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}
