import style from "./topbar.module.scss";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import config from "../../utils/config";
import { imgUrl } from "../../utils/constant";

export default function Topbar() {
  const user = useSelector((state) => state?.auth?.user);
  if (!user) return <></>;
  const PF = config.PUBLIC_FOLDER;
  return (
    <div className={style.topbarContainer}>
      <div className={style.topbarLeft}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className={style.logo}>Vuanhbook</span>
        </Link>
      </div>
      <div className={style.topbarCenter}>
        <div className={style.searchbar}>
          <Search className={style.searchIcon} />
          <input
            placeholder="Search for friend, post or video"
            className={style.searchInput}
          />
        </div>
      </div>
      <div className={style.topbarRight}>
        <div className={style.topbarLinks}>
          <span className={style.topbarLink}>Homepage</span>
          <span className={style.topbarLink}>Timeline</span>
        </div>
        <div className={style.topbarIcons}>
          <div className={style.topbarIconItem}>
            <Person />
            <span className={style.topbarIconBadge}>1</span>
          </div>
          <div className={style.topbarIconItem}>
            <Chat />
            <span className={style.topbarIconBadge}>2</span>
          </div>
          <div className={style.topbarIconItem}>
            <Notifications />
            <span className={style.topbarIconBadge}>1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture ?  user.profilePicture : imgUrl.noAvtUrl}
            alt=""
            className={style.topbarImg}
          />
        </Link>
      </div>
    </div>
  );
}
