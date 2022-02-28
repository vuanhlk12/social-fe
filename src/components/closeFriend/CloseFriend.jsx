import config from "../../utils/config";
import style from "./closeFriend.module.scss";

export default function CloseFriend({ user }) {
  const PF = config.PUBLIC_FOLDER;
  return (
    <li className={style.sidebarFriend}>
      <img
        className={style.sidebarFriendImg}
        src={ user.profilePicture}
        alt=""
      />
      <span className={style.sidebarFriendName}>{user.username}</span>
    </li>
  );
}
