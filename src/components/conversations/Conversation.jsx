import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../utils/config";
import style from "./conversation.module.scss";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = config.PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className={style.conversation}>
      <img
        className={style.conversationImg}
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className={style.conversationName}>{user?.username}</span>
    </div>
  );
}
