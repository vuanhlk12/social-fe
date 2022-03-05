import style from "./topbar.module.scss";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { imgUrl } from "../../utils/constant";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { authActionType } from "authReducer/AuthReducer";

export default function Topbar() {
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const history = useHistory();
  if (!user) return <></>;

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
          <div
            className={style.topbarIconItem}
            onClick={() => history.push("/messenger")}
          >
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
            src={user.profilePicture ? user.profilePicture : imgUrl.noAvtUrl}
            alt=""
            className={style.topbarImg}
          />
        </Link>
        <IconButton onClick={() => dispatch({ type: authActionType.LOGOUT })}>
          <LogoutIcon sx={{ color: "#fff" }} />
        </IconButton>
      </div>
    </div>
  );
}
