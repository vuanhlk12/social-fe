import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../utils/config";
import api from "../../utils/helper";
import style from "./chatOnline.module.scss";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = config.PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await api({
        method: "get",
        url: "/users/friends/" + currentId,
      });
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await api({
        method: "get",
        url: `/conversations/find/${currentId}/${user._id}`,
      });
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.chatOnline}>
      {onlineFriends.map((o) => (
        <div className={style.chatOnlineFriend} onClick={() => handleClick(o)}>
          <div className={style.chatOnlineImgContainer}>
            <img
              className={style.chatOnlineImg}
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className={style.chatOnlineBadge}></div>
          </div>
          <span className={style.chatOnlineName}>{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
