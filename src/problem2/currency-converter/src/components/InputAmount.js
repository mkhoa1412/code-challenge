import { Grid, InputAdornment, TextField } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { handleFirstAmount } from '../redux/actions/amountActions'

export default function InputAmount(props) {
  const { firstAmount } = props

  const ref = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <>
      <Grid item xs={12} md>
        <TextField
          value={firstAmount}
          onChange={(e) => dispatch(handleFirstAmount(+e.target.value))}
          label='Amount'
          inputRef={ref}
          fullWidth
          InputProps={{
            type: 'number',
            startAdornment: <InputAdornment position='start'>$</InputAdornment>
          }}
        />
      </Grid>
    </>
  )
}
