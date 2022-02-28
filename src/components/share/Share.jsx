import style from "./share.module.scss";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import config from "../../utils/config";
import api from "../../utils/helper";
import { imgUrl } from "../../utils/constant";
import { handleUpload } from "../../utils/common";

export default function Share() {
  const user = useSelector((state) => state?.auth?.user);
  const PF = config.PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const imgUrl = await handleUpload(file, user?._id);
      newPost.img = imgUrl;
    }
    try {
      const res = await api({
        method: "post",
        url: `/posts`,
        data: newPost,
      });
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className={style.share}>
      <div className={style.shareWrapper}>
        <div className={style.shareTo}>
          <img
            className={style.shareProfileImg}
            src={user.profilePicture ? user.profilePicture : imgUrl.noAvtUrl}
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className={style.shareInput}
            ref={desc}
          />
        </div>
        <hr className={style.shareHr} />
        {file && (
          <div className={style.shareImgContainer}>
            <img
              className={style.shareImg}
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Cancel
              className={style.shareCancelImg}
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className={style.shareBottom} onSubmit={submitHandler}>
          <div className={style.shareOptions}>
            <label htmlFor="file" className={style.shareOption}>
              <PermMedia htmlColor="tomato" className={style.shareIcon} />
              <span className={style.shareOptionText}>Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className={style.shareOption}>
              <Label htmlColor="blue" className={style.shareIcon} />
              <span className={style.shareOptionText}>Tag</span>
            </div>
            <div className={style.shareOption}>
              <Room htmlColor="green" className={style.shareIcon} />
              <span className={style.shareOptionText}>Location</span>
            </div>
            <div className={style.shareOption}>
              <EmojiEmotions
                htmlColor="goldenrod"
                className={style.shareIcon}
              />
              <span className={style.shareOptionText}>Feelings</span>
            </div>
          </div>
          <button className={style.shareButton} type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
