import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://juniors-gym-app-backend-dev-ktbd.2.us-1.fl0.io/api',
});

export default axiosClient;
