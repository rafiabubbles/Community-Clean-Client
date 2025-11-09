import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000", // এখানে তোমার সার্ভারের URL দিবে
});

export default axiosPublic;
