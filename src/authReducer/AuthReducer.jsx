import { produce } from "immer";

export const authActionType = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  UPDATE_USER: "UPDATE_USER",
  LOGOUT: "LOGOUT",
};

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionType.LOGIN_START:
      return produce(state, (draft) => {
        draft.user = null;
        draft.isFetching = true;
      });
    case authActionType.LOGIN_SUCCESS: {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return produce(state, (draft) => {
        draft.user = action.payload;
        draft.isFetching = false;
      });
    }
    case authActionType.LOGIN_FAILURE:
      return produce(state, (draft) => {
        draft.user = null;
        draft.isFetching = false;
        draft.error = true;
      });
    case authActionType.FOLLOW:
      return produce(state, (draft) => {
        draft.user.followings = [...draft.user.followings, action.payload];
      });
    case authActionType.UNFOLLOW:
      return produce(state, (draft) => {
        draft.user.followings = draft.user.followings.filter(
          (following) => following !== action.payload
        );
      });
    case authActionType.UPDATE_USER:
      return produce(state, (draft) => {
        const newUserData = { ...draft.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify({ newUserData }));
        return produce(state, (draft) => {
          draft.user = newUserData;
          draft.isFetching = false;
        });
      });
    case authActionType.LOGOUT:
      return produce(state, (draft) => {
        localStorage.clear();
        draft.user = null;
      });
    default:
      return state;
  }
};

export default authReducer;
