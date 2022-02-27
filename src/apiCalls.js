import api from "./utils/helper";
import { authActionType } from "./auth/AuthActions";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: authActionType.LOGIN_START });
  try {
    const res = await api({
      method: "post",
      url: "/auth/login",
      data: userCredential,
    });
    console.log(res.data);
    dispatch({ type: authActionType.LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: authActionType.LOGIN_FAILURE, payload: err });
  }
};
