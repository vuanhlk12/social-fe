import axios from "axios";
import Qs from "qs";
import cookie from "js-cookie";

const request = axios.create();

request.interceptors.request.use(
  (config) => {
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
    baseURL: "http://localhost:8800/",
    ...options,
    paramsSerializer: (params) =>
      Qs.stringify(params, { arrayFormat: "repeat" }),
    headers: {
      ...options.headers,
    },
  });
};

export default api;
