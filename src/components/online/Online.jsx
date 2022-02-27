import config from "../../utils/config";
import style from "./online.module.scss";

export default function Online({ user }) {
  const PF = config.PUBLIC_FOLDER;

  return (
    <li className={style.rightbarFriend}>
      <div className={style.rightbarProfileImgContainer}>
        <img
          className={style.rightbarProfileImg}
          src={PF + user.profilePicture}
          alt=""
        />
        <span className={style.rightbarOnline}></span>
      </div>
      <span className={style.rightbarUsername}>{user.username}</span>
    </li>
  );
}
