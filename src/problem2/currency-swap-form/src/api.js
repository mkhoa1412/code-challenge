import axios from 'axios';

export const getTokenPrices = async () => {
  const response = await axios.get('https://interview.switcheo.com/prices.json');
  return response.data;
};
