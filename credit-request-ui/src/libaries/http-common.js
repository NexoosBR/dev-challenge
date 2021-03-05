import axios from "axios";

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_CREDIT_REQUEST_API,
  headers: {
    Authorization: "Bearer {token}"
  }
});
