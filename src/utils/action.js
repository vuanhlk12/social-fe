import api from "./helper";

export const getUser = (username) => {
  return api({
    method: "get",
    url: `/users?username=${username}`,
  });
};

export const updateUser = (userId, data) => {
  return api({
    method: "put",
    url: `/users/${userId}`,
    data,
  });
};
