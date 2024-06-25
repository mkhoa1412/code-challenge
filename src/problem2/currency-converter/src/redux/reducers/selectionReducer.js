import { SET_FROM_CURRENCY, SET_TO_CURRENCY, SET_SWITCH_CURRENCY } from '../actions/selectActions'

const INITIAL_STATE = {
  fromCurrency: null,
  toCurrency: null
}

const selectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FROM_CURRENCY:
      return {
        ...state,
        fromCurrency: action.data
      }

    case SET_TO_CURRENCY:
      return {
        ...state,
        toCurrency: action.data
      }

    case SET_SWITCH_CURRENCY:
      return {
        fromCurrency: state.toCurrency,
        toCurrency: state.fromCurrency
      }

    default:
      return state
  }
}

export default selectionReducer
