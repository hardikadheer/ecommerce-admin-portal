import axios from "axios";

// Create an Axios instance with your backend base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure this matches your backend
});

export default API;
