const SET_FIRST_AMOUNT = 'SET_FIRST_AMOUNT'

const handleFirstAmount = (value) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_FIRST_AMOUNT,
      data: value
    })
  }
}

export { SET_FIRST_AMOUNT, handleFirstAmount }
