import { useState, useRef, useEffect } from 'react'
import { ICoin } from './interfaces'

interface CoinDropdownProps {
  name: string
  coin?: ICoin
  listCoin?: ICoin[]
  onCurrencyChange: (coin: ICoin) => void
}

const CoinDropdown: React.FC<CoinDropdownProps> = ({ name, coin, listCoin, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleCurrencySelect = (selectedCoin: ICoin) => {
    setIsOpen(false)
    onCurrencyChange(selectedCoin)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const id = name.toLowerCase().replace(' ', '')

  return (
    <div className='relative block text-left' ref={dropdownRef}>
      <label htmlFor={id} className='block text-sm/6 font-bold text-gray-900'>
        {name}
      </label>
      <div className='text-left'>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          type='button'
          className='inline-flex w-full justify-left items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50'
          id={id}
          aria-expanded={isOpen}
          aria-haspopup='true'
        >
          <img src={`${import.meta.env.VITE_TOKEN_ICON_BASE}${coin?.currency}.svg`} alt={coin?.currency} className='w-10 h-10 rounded-full' />
          {coin?.currency}
        </button>
      </div>
      {isOpen && (
        <div
          className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby={name}
        >
          <div className='py-1 max-h-80 overflow-y-auto' role='none'>
            {listCoin?.map((coin) => (
              <div key={coin.currency} onClick={() => handleCurrencySelect(coin)} className='flex items-center gap-2 px-4 py-4 cursor-pointer hover:bg-gray-100'>
                <img src={`${import.meta.env.VITE_TOKEN_ICON_BASE}${coin.currency}.svg`} alt={coin.currency} className='w-10 h-10 rounded-full' />
                <span className='block px-4 py-2 text-sm text-gray-700'>{coin.currency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CoinDropdown
