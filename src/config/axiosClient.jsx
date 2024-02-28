import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://juniors-gym-app-backend-dev-ktbd.2.us-1.fl0.io/api',
  //baseURL: "http://localhost:4000/api",
});

export default axiosClient;
