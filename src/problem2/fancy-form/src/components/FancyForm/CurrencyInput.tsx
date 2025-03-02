import { useField } from 'informed'
import { ICoin } from './interfaces'

interface CurrencyInputProps {
  amount?: number
  coin?: ICoin
  name: string
  label?: string
  required?: string
  validate?: (value: any) => string | undefined
}

const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
  const { coin, label } = props

  const { fieldApi, fieldState, userProps, ref } = useField(props)
  const { ...rest } = userProps

  const { showError } = fieldState

  return (
    <div className='text-left space-x-4 mb-4'>
      <label htmlFor={coin?.currency} className='block text-sm/6 font-bold text-gray-900'>
        {label}
      </label>
      <div
        className={`flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600  ${
          showError ? 'outline-red-500' : 'outline-gray-300'
        } `}
      >
        <input
          {...userProps}
          {...rest}
          id={coin?.currency}
          ref={ref}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            fieldApi.setValue(e.target.value)
            fieldApi.validate()
          }}
          className={`className="block min-w-0 h-[56px] grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6`}
        />
      </div>
      {showError && typeof fieldState?.error === 'string' && <small style={{ color: 'red' }}>{fieldState.error}</small>}
    </div>
  )
}

export default CurrencyInput
