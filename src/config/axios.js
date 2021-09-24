import axios from "axios";

// When calling axiosClient, it will always fetch the baseURL, whatever it is(development!==production)
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default axiosClient;
