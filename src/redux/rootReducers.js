import { combineReducers } from "redux";
import authReducer from "../authReducer/AuthReducer";

const rootReducer = combineReducers({ auth: authReducer });

export default rootReducer;
