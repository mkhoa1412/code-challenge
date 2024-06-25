import { Button, Grid } from '@mui/material'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { handleSwitchCurrency } from '../redux/actions/selectActions'
import { useDispatch } from 'react-redux'

export default function SwitchCurrency() {
  const dispatch = useDispatch()

  const handleSwitchValue = () => {
    dispatch(handleSwitchCurrency())
  }

  return (
    <>
      <Grid item xs={12} md='auto'>
        <Button
          sx={{
            borderRadius: 1,
            height: '100%',
            width: '100%'
          }}
          onClick={() => handleSwitchValue()}
        >
          <CompareArrowsIcon
            sx={{
              fontSize: 30
            }}
          />
        </Button>
      </Grid>
    </>
  )
}
