import style from "./profile.module.scss";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import api from "../../utils/helper";
import config from "../../utils/config";

export default function Profile() {
  const PF = config.PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const params = useParams();
  const username = params?.username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await api({
        method: "get",
        url: `/users?username=${username}`,
      });
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  //return <></>;

  return (
    <>
      <Topbar />
      <div className={style.profile}>
        <Sidebar />
        <div className={style.profileRight}>
          <div className={style.profileRightTop}>
            <div className={style.profileCover}>
              <img
                className={style.profileCoverImg}
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className={style.profileUserImg}
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className={style.profileInfo}>
              <h4 className={style.profileInfoName}>{user.username}</h4>
              <span className={style.profileInfoDesc}>{user.desc}</span>
            </div>
          </div>
          <div className={style.profileRightBottom}>
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
