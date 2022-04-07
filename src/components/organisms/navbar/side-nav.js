import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineHistory,
} from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { MdOutlineWatchLater, MdPlaylistPlay } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useAuth } from "../../../helpers";
import "./nav.css";
export function SideNav() {
  const navOptions = [
    { id: uuid(), logo: <AiOutlineHome />, name: "Home" },
    { id: uuid(), logo: <AiOutlineHistory />, name: "History" },
    { id: uuid(), logo: <FcLike />, name: "Liked" },
    { id: uuid(), logo: <MdOutlineWatchLater />, name: "WatchLater" },
    { id: uuid(), logo: <MdPlaylistPlay />, name: "Playlist" },
    { id: uuid(), logo: <AiOutlineLogout />, name: "Logout" },
  ];
  const { logout } = useAuth();
  return (
    <div className=" align-center side-nav flex flex-column justify-space-around">
      {navOptions.map(({ id, logo, name }) => (
        <NavLink
          onClick={name === "Logout" && logout}
          to={name !== "Logout" ? `/${name.toLowerCase()}` : "/"}
          className={({ isActive }) =>
            "flex bold option-select justify-space-around flex-column align-center" +
            (isActive ? "  option-choose" : "")
          }
          key={id}
        >
          {logo}
          <h1 className="sm">{name}</h1>
        </NavLink>
      ))}
    </div>
  );
}
