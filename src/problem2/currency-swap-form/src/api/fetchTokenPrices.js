import axios from "axios";

const API_URL = "https://interview.switcheo.com/prices.json";

export const fetchTokenPrices = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return null;
  }
};
