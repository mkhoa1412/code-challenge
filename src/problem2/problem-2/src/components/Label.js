import React from 'react'

export default function Label({children, htmlFor=''}) {
  return (
    <label className='text-xs text-gray-800 font-semibold' htmlFor={htmlFor}>{children}</label>
  )
}
