import { Container, Grid, Typography } from '@mui/material'
import InputAmount from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { SET_FROM_CURRENCY, SET_TO_CURRENCY } from './redux/actions/selectActions'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchExchangeRate } from './services/currencyService'
import BoxResult from './components/BoxResult'

const boxStyles = {
  bgcolor: '#fbfbfb',
  marginTop: '10rem',
  textAlign: 'center',
  color: '#222',
  minHeight: '20rem',
  borderRadius: 2,
  padding: '4rem 2rem',
  boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
  position: 'relative'
}

function App() {
  const amount = useSelector((state) => state.amount.firstAmount)

  const fromValue = useSelector((state) => state.selection.fromCurrency)
  const toValue = useSelector((state) => state.selection.toCurrency)

  const [result, setResult] = useState({})

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleResult()
  }, [amount, fromValue, toValue])

  const handleResult = async () => {
    setLoading(true)
    const res = await fetchExchangeRate(fromValue?.code, toValue?.code)

    const resultObj = {
      total: '',
      msg: '',
      status: ''
    }

    if (res && res.data && Object.keys(res.data).length === 1) {
      const exchangeRate = Object.values(res.data)[0]
      const total = amount * exchangeRate

      resultObj.total = +total
      resultObj.msg = 'Success'
      resultObj.status = +200

      setResult(resultObj)
      setLoading(false)
    } else {
      if (res && res.status === 422) {
        console.log(res)
        resultObj.total = ''
        resultObj.msg = 'Error ! Please select the currency in the list again.'
        resultObj.status = res.status

        setResult(resultObj)
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Container maxWidth='md' sx={boxStyles}>
        <Typography variant='h5' sx={{ marginBottom: '1rem' }}>
          Stay Ahead with Accurate Conversations
        </Typography>

        <Typography variant='subtitle1' sx={{ marginBottom: '2rem' }}>
          Only conversions within this{' '}
          <a rel='noreferrer' target='_blank' href='https://freecurrencyapi.com/docs'>
            currency list
          </a>
        </Typography>
        <Grid container spacing={2}>
          <InputAmount firstAmount={amount} />
          <SelectCountry type={SET_FROM_CURRENCY} value={fromValue} label={'From'} option={1} />
          <SwitchCurrency />
          <SelectCountry type={SET_TO_CURRENCY} value={toValue} label={'To'} option={2} />
        </Grid>

        {amount && fromValue && toValue ? (
          <BoxResult loading={loading} amount={amount} fromValue={fromValue} toValue={toValue} result={result} />
        ) : (
          ''
        )}
      </Container>
    </>
  )
}

export default App
