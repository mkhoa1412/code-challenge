import { combineReducers } from 'redux'
import selectionReducer from './selectionReducer'
import amountReducer from './amountReducer'

const rootReducer = combineReducers({
  selection: selectionReducer,
  amount: amountReducer
})

export default rootReducer
