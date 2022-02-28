import style from "./profile.module.scss";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import config from "../../utils/config";
import { imgUrl } from "../../utils/constant";
import { handleUpload } from "../../utils/common";
import { storage } from "../../utils/firebase";
import { getUser, updateUser } from "../../utils/action";

export default function Profile() {
  const [user, setUser] = useState({});
  const params = useParams();
  const username = params?.username;

  const fetchUser = async () => {
    const res = await getUser(username);
    setUser(res.data);
  };

  const handleUploadFile = async (e) => {
    const { files } = e.target;
    const imgUrl = await handleUpload(files[0], user?._id);
    const res = await updateUser(user?._id, {
      profilePicture: imgUrl,
      userId: user?._id,
    });
    fetchUser();
    console.log("res", res);
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

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
                src={user.coverPicture ?? "person/noCover.png"}
                alt=""
              />
              <img
                className={style.profileUserImg}
                src={user.profilePicture ?? imgUrl.noAvtUrl}
                alt=""
              />
              <input
                type="file"
                id="upload"
                accept="image/png, image/gif, image/jpeg"
                multiple={false}
                onChange={handleUploadFile}
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
