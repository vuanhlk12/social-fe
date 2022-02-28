import style from "./post.module.scss";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import config from "../../utils/config";
import api from "../../utils/helper";
import { imgUrl } from "../../utils/constant";

export default function Post({ post }) {
  const [like, setLike] = useState(post?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = config.PUBLIC_FOLDER;
  const currentUser = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await api({
        method: "get",
        url: `/users?userId=${post.userId}`,
      });
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      const res = await api({
        method: "put",
        url: "/posts/" + post._id + "/like",
        data: { userId: currentUser._id },
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className={style.post}>
      <div className={style.postWrapper}>
        <div className={style.postTop}>
          <div className={style.postTopLeft}>
            <Link to={`/profile/${user.username}`}>
              <img
                className={style.postProfileImg}
                src={
                  user.profilePicture
                    ?  user.profilePicture
                    : imgUrl.noAvtUrl
                }
                alt=""
              />
            </Link>
            <span className={style.postUsername}>{user.username}</span>
            <span className={style.postDate}>{format(post.createdAt)}</span>
          </div>
          <div className={style.postTopRight}>
            <MoreVert />
          </div>
        </div>
        <div className={style.postCenter}>
          <span className={style.postText}>{post?.desc}</span>
          <img className={style.postImg} src={ post.img} alt="" />
        </div>
        <div className={style.postBottom}>
          <div className={style.postBottomLeft}>
            <img
              className={style.likeIcon}
              src={imgUrl.likeUrl}
              onClick={likeHandler}
              alt=""
            />
            <img
              className={style.likeIcon}
              src={imgUrl.heartUrl}
              onClick={likeHandler}
              alt=""
            />
            <span className={style.postLikeCounter}>{like} people like it</span>
          </div>
          <div className={style.postBottomRight}>
            <span className={style.postCommentText}>
              {post.comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
