import axios from "axios";
import { useRef } from "react";
import style from "./register.module.scss";
import { useHistory } from "react-router";
import api from "../../utils/helper";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const res = await api({
          method: "post",
          url: "/auth/register",
          data: user,
        });
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={style.login}>
      <div className={style.loginWrapper}>
        <div className={style.loginLeft}>
          <h3 className={style.loginLogo}>Vuanhbook</h3>
          <span className={style.loginDesc}>
            Connect with friends and the world around you on Vuanhbook.
          </span>
        </div>
        <div className={style.loginRight}>
          <form className={style.loginBox} onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className={style.loginInput}
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className={style.loginInput}
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className={style.loginInput}
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className={style.loginInput}
              type="password"
            />
            <button className={style.loginButton} type="submit">
              Sign Up
            </button>
            <button className={style.loginRegisterButton}>
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
