import style from "./profile.module.scss";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { imgUrl } from "../../utils/constant";
import { handleUpload } from "../../utils/common";
import { getUser, updateUser } from "../../utils/action";
import { useDispatch, useSelector } from "react-redux";
import { authActionType } from "../../authReducer/AuthReducer";

export default function Profile() {
  const params = useParams();
  const { username } = params;
  const currentUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();

  const isCurrentUser = username === currentUser?.username;

  const [user, setUser] = useState(isCurrentUser ? currentUser : {});
  const fileUploadRef = useRef();

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
    const temp = dispatch({
      type: authActionType.UPDATE_USER,
      payload: res?.data,
    });
    console.log("temp", temp);
  };

  useEffect(() => {
    !isCurrentUser && fetchUser();
  }, [username]);

  useEffect(() => {
    isCurrentUser && setUser(currentUser);
  }, [currentUser]);

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
                onClick={() => fileUploadRef.current?.click()}
              />
              {isCurrentUser && (
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="upload"
                  accept="image/png, image/gif, image/jpeg"
                  multiple={false}
                  onChange={handleUploadFile}
                  ref={fileUploadRef}
                />
              )}
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
