import { Autocomplete, Box, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { fetchAllCountry } from '../services/contriesService'
import { useDispatch } from 'react-redux'
import { handleCurrencyValue } from '../redux/actions/selectActions'
import SelectionLoading from './SelectLoading'

export default function SelectCountry(props) {
  const dispatch = useDispatch()

  const { type, value, label, option } = props

  const [countryList, setCountryList] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoaded(true)
      const res = await fetchAllCountry()
      const dataFilter = res.filter((item) => 'currencies' in item)
      const dataCountries = dataFilter.map((item) => {
        return {
          name: item.name.common,
          code: Object.keys(item.currencies)[0],
          flag: item.flags.svg
        }
      })
      setCountryList(dataCountries)
    } catch (err) {
      console.log(err)
    } finally {
      setLoaded(false)
    }
  }

  return (
    <>
      <Grid xs={12} md={3} item>
        {loaded ? (
          <SelectionLoading />
        ) : (
          <Autocomplete
            value={value?.name ? `${value.code} - ${value.name}` : `Option ${option}`}
            onChange={(event, newValue) => {
              dispatch(handleCurrencyValue(type, newValue))
            }}
            options={countryList}
            filterOptions={(options, state) =>
              options.filter(
                (option) =>
                  option.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                  option.code.toLowerCase().includes(state.inputValue.toLowerCase())
              )
            }
            renderOption={(props, option) => (
              <Box component='li' {...props}>
                <img src={option.flag} alt={`${option.name} flag`} style={{ width: '20px', marginRight: '10px' }} />
                {option.code} - {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={value?.flag ? value.flag : ''}
                        style={value?.flag ? { width: '20px', marginRight: '10px' } : {}}
                        alt={value?.flag ? `${value.flag} flag` : ''}
                      />
                    </Box>
                  )
                }}
              />
            )}
          />
        )}
      </Grid>
    </>
  )
}
