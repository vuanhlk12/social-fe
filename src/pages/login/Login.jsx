import { useRef } from "react";
import style from "./login.module.scss";
import { loginCall } from "../../apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const isFetching = useSelector((state) => state?.auth?.isFetching);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    console.log("clivk");
    e.preventDefault();

    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className={style.login}>
      <div className={style.loginWrapper}>
        <div className={style.loginLeft}>
          <h3 className={style.loginLogo}>Lamasocial</h3>
          <span className={style.loginDesc}>
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className={style.loginRight}>
          <form className={style.loginBox} onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className={style.loginInput}
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className={style.loginInput}
              ref={password}
            />
            <button
              className={style.loginButton}
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className={style.loginForgot}>Forgot Password?</span>
            <button className={style.loginRegisterButton}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
