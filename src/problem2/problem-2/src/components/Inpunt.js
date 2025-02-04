import React from 'react'

export default function Input({isReadOnly, register, id, name}) {
  return (
    <input
      className="border border-gray-300 rounded-md p-1 focus:outline-none text-sm"
      type="text"
      id={id}
      {...register(name)}
      readOnly={isReadOnly}
    />
  )
}
