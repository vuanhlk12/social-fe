import style from "./rightbar.module.scss";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Add, Remove } from "@mui/icons-material";
import api from "../../utils/helper";
import config from "../../utils/config";
import { imgUrl } from "../../utils/constant";

export default function Rightbar({ user }) {
  const PF = config.PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const currentUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await api({
          method: "get",
          url: "/users/friends/" + user._id,
        });
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    !!user?._id && getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await api({
          method: "put",
          url: `/users/${user._id}/unfollow`,
          data: {
            userId: currentUser._id,
          },
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await api({
          method: "put",
          url: `/users/${user._id}/follow`,
          data: {
            userId: currentUser._id,
          },
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className={style.birthdayContainer}>
          <img className={style.birthdayImg} src="assets/gift.png" alt="" />
          <span className={style.birthdayText}>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className={style.rightbarAd} src="assets/ad.png" alt="" />
        <h4 className={style.rightbarTitle}>Online Friends</h4>
        <ul className={style.rightbarFriendList}>
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className={style.rightbarFollowButton} onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className={style.rightbarTitle}>User information</h4>
        <div className={style.rightbarInfo}>
          <div className={style.rightbarInfoItem}>
            <span className={style.rightbarInfoKey}>City:</span>
            <span className={style.rightbarInfoValue}>{user.city}</span>
          </div>
          <div className={style.rightbarInfoItem}>
            <span className={style.rightbarInfoKey}>From:</span>
            <span className={style.rightbarInfoValue}>{user.from}</span>
          </div>
          <div className={style.rightbarInfoItem}>
            <span className={style.rightbarInfoKey}>Relationship:</span>
            <span className={style.rightbarInfoValue}>
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className={style.rightbarTitle}>User friends</h4>
        <div className={style.rightbarFollowings}>
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className={style.rightbarFollowing}>
                <img
                  src={
                    friend.profilePicture
                      ?  friend.profilePicture
                      : imgUrl.noAvtUrl
                  }
                  alt=""
                  className={style.rightbarFollowingImg}
                />
                <span className={style.rightbarFollowingName}>
                  {friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className={style.rightbar}>
      <div className={style.rightbarWrapper}>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
