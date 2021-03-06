import api from "./utils/helper";
import { authActionType } from "./authReducer/AuthReducer";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: authActionType.LOGIN_START });
  try {
    const res = await api({
      method: "post",
      url: "/auth/login",
      data: userCredential,
    });
    dispatch({ type: authActionType.LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: authActionType.LOGIN_FAILURE, payload: err });
  }
};
