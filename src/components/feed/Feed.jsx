import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import style from "./feed.module.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Posts } from "../../dummyData";
import api from "../../utils/helper";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  const user = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await api({
        method: "get",
        url: username
          ? "/posts/profile/" + username
          : "posts/timeline/" + user._id,
      });

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className={style.feed}>
      <div className={style.feedWrapper}>
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
