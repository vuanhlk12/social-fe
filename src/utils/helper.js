import axios from "axios";
import Qs from "qs";
import cookie from "js-cookie";
import config from "./config";

const user = JSON.parse(localStorage.getItem("user")) || null;

const request = axios.create();

request.interceptors.request.use(
  (config) => {
    // console.log("import.meta.env", import.meta.env);
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const api = (options = {}) => {
  return request({
    baseURL: config.URL,
    ...options,
    paramsSerializer: (params) =>
      Qs.stringify(params, { arrayFormat: "repeat" }),
    headers: {
      token: "Bearer " + user?.accessToken,
      ...options.headers,
    },
  });
};

export default api;
