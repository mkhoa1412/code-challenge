// src/services/api.ts
import axios from "axios";

const API_BASE_URL = "https://interview.switcheo.com";

// Define the type for a single token
export interface Token {
  currency: string;
  date: string; // Consider using Date if you need to work with dates
  price: number;
}

// The API response is an array of Token objects
export type TokenPrices = Token[];

export const fetchTokenPrices = async (): Promise<TokenPrices> => {
  try {
    const response = await axios.get<TokenPrices>(
      `${API_BASE_URL}/prices.json`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    throw error; // Re-throw for handling in component
  }
};
