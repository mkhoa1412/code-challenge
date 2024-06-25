// import { SET_FIRST_AMOUNT } from '../actions/selectActions'
import { SET_FIRST_AMOUNT } from '../actions/amountActions'

const INITIAL_STATE = {
  firstAmount: null
}

const amountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FIRST_AMOUNT:
      return {
        ...state,
        firstAmount: action.data
      }

    default:
      return state
  }
}

export default amountReducer
