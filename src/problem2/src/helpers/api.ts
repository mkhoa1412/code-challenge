import axios, { AxiosRequestConfig } from "axios";

const axionsInstance = axios.create();

export async function get<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const response = await axionsInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    console.error("error during GET request:", error);
    throw error;
  }
}
