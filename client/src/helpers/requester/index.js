import axios from "axios";

export default function requester() {
  const instance = axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:5000/",
  });
  return instance;
}
