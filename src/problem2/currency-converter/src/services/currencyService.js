import axios from './customize-axios'

const fetchExchangeRate = (baseCurrency, currencies) => {
  return axios.get('https://api.freecurrencyapi.com/v1/latest', {
    params: {
      apikey: 'fca_live_yGgKgD2sCdOyy6u4sWWMnrJSBEiX3Jk4soBHPbVT',
      base_currency: baseCurrency,
      currencies: currencies
    }
  })
}
export { fetchExchangeRate }
