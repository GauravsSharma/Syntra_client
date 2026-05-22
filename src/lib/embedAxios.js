import axios from "axios";

const embedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default embedApi;