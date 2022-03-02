export const authActionType = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  UPDATE_USER: "UPDATE_USER",
};

export const LoginStart = (userCredentials) => ({
  type: authActionType.LOGIN_START,
});

export const LoginSuccess = (user) => ({
  type: authActionType.LOGIN_SUCCESS,
  payload: user,
});

export const LoginFailure = () => ({
  type: authActionType.LOGIN_FAILURE,
});

export const Follow = (userId) => ({
  type: authActionType.FOLLOW,
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: authActionType.UNFOLLOW,
  payload: userId,
});
