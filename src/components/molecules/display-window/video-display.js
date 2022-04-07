import { AiFillLike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import { BsFillBookmarkFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import "./video-display.css";
import {
  addToLikedVideos,
  removeFromLikedVideos,
  addToWatchLater,
  addToHistory,
  removeFromWatchLater,
  useAuth,
  useFeature,
} from "../../../helpers";
import { useState } from "react";
import { SmallLoader } from "../../";
import { useNavigate } from "react-router-dom";
export function VideoCard({
  video,
  id,
  img,
  title,
  cardStyle,
  cardHeader,
  likes,
  views,
}) {
  const { likelist, watchlater, dispatchFeature } = useFeature();
  const { token, setModal } = useAuth();
  const navigate = useNavigate();
  const [delayEnhancers, setDelayEnhancers] = useState({
    likeHandle: false,
    watchLaterHandle: false,
  });
  const { likeHandle, watchLaterHandle } = delayEnhancers;
  const likeHandler = () =>
    addToLikedVideos(video, dispatchFeature, token, setDelayEnhancers);
  const removeLikeHandler = () =>
    removeFromLikedVideos(dispatchFeature, token, id, setDelayEnhancers);
  const watchLaterHandler = () =>
    addToWatchLater(video, dispatchFeature, token, setDelayEnhancers);
  const removeWatchLaterHandler = () =>
    removeFromWatchLater(dispatchFeature, token, id, setDelayEnhancers);
  const historyHandler = () => {
    addToHistory(video, dispatchFeature, token);
    navigate(`/home/video/${video.video_id}`);
  };
  const width = {
    width: "var(--size-12)",
  };
  return (
    <div
      id={cardHeader}
      className="position-relative video-card-container height-max-content width-max-content"
    >
      <div className={cardStyle} onClick={historyHandler}>
        <img src={img} alt={title} loading="lazy" />

        <h2 className=" bold size-12">{title}</h2>
      </div>
      <section className=" flex flex-wrap video_status">
        <p className="bold xsm text-white">{likes} Likes</p>
        <p className="bold xsm text-white">{views} Views</p>
        <div style={width}>
          {likeHandle ? (
            <SmallLoader />
          ) : (
            (likelist?.some((video) => video._id === id) && (
              <AiFillLike
                onClick={removeLikeHandler}
                color="var(--primary-200)"
              />
            )) || <AiFillLike onClick={likeHandler} className="text-white" />
          )}
        </div>
        <div style={width}>
          {watchLaterHandle ? (
            <SmallLoader />
          ) : watchlater?.find((video) => video._id === id) ? (
            <BsFillBookmarkCheckFill
              onClick={removeWatchLaterHandler}
              color="var(--primary-200)"
            />
          ) : (
            <BsFillBookmarkFill
              onClick={watchLaterHandler}
              className="text-white"
            />
          )}
        </div>
        <div className="position-relative">
          <MdPlaylistAdd
            className="text-white"
            onClick={() =>
              setModal((modal) => ({ state: true, payload: video }))
            }
          />
        </div>
      </section>
    </div>
  );
}
