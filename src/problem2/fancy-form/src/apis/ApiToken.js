import axios from "axios";
import { API_URL } from "../enum/enum";

const API_TOKEN_URL = API_URL;

export const fetchTokenInfo = async () => {
  try {
    const result = await axios.get(API_TOKEN_URL);
    return (result?.data || []).filter((item) => {
      const date = new Date(item?.date);
      return item?.currency && item?.price && !isNaN(date.getTime());
    });
  } catch (error) {
    throw error;
  }
};
