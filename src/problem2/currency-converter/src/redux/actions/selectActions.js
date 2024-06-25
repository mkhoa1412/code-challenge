const SET_FROM_CURRENCY = 'SET_FROM_CURRENCY'
const SET_TO_CURRENCY = 'SET_TO_CURRENCY'
const SET_SWITCH_CURRENCY = 'SET_SWITCH_CURRENCY'

const handleCurrencyValue = (type, value) => {
  return (dispatch, getState) => {
    dispatch({
      type: type,
      data: value
    })
  }
}

const handleSwitchCurrency = (type) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SWITCH_CURRENCY
    })
  }
}

export { SET_FROM_CURRENCY, SET_TO_CURRENCY, SET_SWITCH_CURRENCY, handleCurrencyValue, handleSwitchCurrency }
