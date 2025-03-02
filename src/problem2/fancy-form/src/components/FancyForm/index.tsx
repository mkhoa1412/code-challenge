import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'informed'
import CurrencyInput from './CurrencyInput'
import CoinDropdown from './CoinDropdown'
import SubmitButton from './SubmitButton'
import { ICoin } from './interfaces'

const validate = (value: any) => {
  if (!/^\d*\.?\d+$/.test(value)) {
    return 'Please input a number value.'
  }
}

const filterLatestCoins = (coins: ICoin[]): ICoin[] => {
  return coins.reduce((acc: ICoin[], coin: ICoin) => {
    const existingCoin = acc.find((c) => c.currency === coin.currency)
    if (!existingCoin || new Date(coin.date) < new Date(existingCoin.date)) {
      return acc.filter((c) => c.currency !== coin.currency).concat(coin)
    }
    return acc
  }, [])
}

const FancyForm: React.FC = () => {
  const [coin1, setCoin1] = useState<ICoin>()
  const [coin2, setCoin2] = useState<ICoin>()
  const [amount2, setAmount2] = useState<number>(0)
  const [listCoin, setListCoin] = useState<ICoin[]>()

  useEffect(() => {
    fetchTokens()
  }, [])

  const fetchTokens = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL)
      const coins = response.data
      const filteredCoins = filterLatestCoins(coins)
      setListCoin(filteredCoins)
      setCoin1(filteredCoins[0])
      setCoin2(filteredCoins[0])
    } catch (error) {
      console.error('Error fetching token prices', error)
    }
  }

  const handleCoin1Change = (coin: ICoin) => {
    setCoin1(coin)
  }

  const handleCoin2Change = (coin: ICoin) => {
    setCoin2(coin)
  }

  const swapCurrencies = ({ values }: any) => {
    if (coin1 && coin2) {
      const amount1 = parseInt(values.coin1)
      const amount2 = (amount1 * coin1?.price) / coin2?.price

      setAmount2(amount2 || 0)
    }
  }

  return (
    <div className='w-full max-w-xs sm:max-w-sm md:w-[60%] p-4 bg-white rounded-none shadow-none sm:rounded-lg sm:shadow-md border border-gray-300 '>
      <Form onSubmit={swapCurrencies}>
        <p className='mt-4 mb-10 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance'>Swap coin</p>
        <div className='text-left space-x-4 mb-4'>
          <CoinDropdown name='Swap from' coin={coin1} listCoin={listCoin} onCurrencyChange={handleCoin1Change} />
        </div>

        <CurrencyInput name='coin1' label='Amount' coin={coin1} required='Amount required' validate={validate} />
        <div className='flex justify-center'>
          <SubmitButton />
        </div>

        <div className='text-left space-x-4 mb-4'>
          <CoinDropdown name='Swap to' coin={coin2} listCoin={listCoin} onCurrencyChange={handleCoin2Change} />
          <div className='mt-4'>
            <span className='block text-sm/6 font-medium text-gray-900'>
              You get = {amount2} {coin2?.currency}
            </span>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FancyForm
