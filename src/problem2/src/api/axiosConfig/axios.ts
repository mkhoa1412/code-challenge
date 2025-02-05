import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // Set your API base URL here
  headers: {
    "Content-Type": "application/json",
    // Add any other headers if needed (e.g., Authorization)
  },
});

export default axiosInstance;
