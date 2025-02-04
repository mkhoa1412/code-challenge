import React from 'react'

export default function ErrorMessage({children}) {
  return (
    <p className='text-xs text-red-500 mt-1'>{children}</p>
  )
}
