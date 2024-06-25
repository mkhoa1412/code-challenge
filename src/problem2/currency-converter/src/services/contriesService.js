import axios from './customize-axios'

const fetchAllCountry = () => {
  return axios.get('https://restcountries.com/v3.1/all')
}
export { fetchAllCountry }
