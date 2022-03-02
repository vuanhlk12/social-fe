import style from "./message.module.scss";
import { format } from "timeago.js";
import clsx from "clsx";

export default function Message({ message, own }) {
  return (
    <div className={clsx(style.message, own && style.own)}>
      <div className={style.messageTop}>
        <img
          className={style.messageImg}
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className={style.messageText}>{message.text}</p>
      </div>
      <div className={style.messageBottom}>{format(message.createdAt)}</div>
    </div>
  );
}
