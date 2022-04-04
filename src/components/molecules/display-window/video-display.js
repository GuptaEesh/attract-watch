import { AiFillLike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import { BsFillBookmarkFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import "./video-display.css";
export function VideoCard({ img, title, cardStyle, cardHeader, likes, views }) {
  return (
    <div
      id={cardHeader}
      style={{
        height: "max-content",
        position: "relative",
        width: "max-content",
      }}
    >
      <div className={cardStyle}>
        <img src={img} alt={title} loading="lazy" />

        <h2 className=" text-white bold size-12">{title}</h2>
      </div>
      <section className=" flex flex-wrap video_status">
        <p className="bold xsm text-white">{likes} Likes</p>
        <p className="bold xsm text-white">{views} Views</p>

        <AiFillLike color="var(--white)" />

        <BsFillBookmarkFill color="var(--white)" />

        <div style={{ position: "relative" }}>
          <MdPlaylistAdd color="var(--white)" />
        </div>
      </section>
    </div>
  );
}
