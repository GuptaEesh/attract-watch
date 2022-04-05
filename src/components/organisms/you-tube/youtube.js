import "./youtube.css";
import { AiFillLike } from "react-icons/ai";
import { BsFillBookmarkFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { useState, useEffect } from "react";
import {
  addToHistory,
  addToLikedVideos,
  addToWatchLater,
  removeFromLikedVideos,
  removeFromWatchLater,
  useAuth,
  useFeature,
} from "../../../helpers";
import { SmallLoader, Modal } from "../../";
import { useNavigate } from "react-router-dom";
export function MyYouTube({ video_id, video, videos }) {
  const { dispatchFeature, likelist, watchlater } = useFeature();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [delayEnhancers, setDelayEnhancers] = useState({
    likeHandle: false,
    watchLaterHandle: false,
  });
  const [visible, setVisible] = useState();
  useEffect(() => {
    visible
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [visible]);
  const { likeHandle, watchLaterHandle } = delayEnhancers;
  const likeHandler = () =>
    addToLikedVideos(video, dispatchFeature, token, setDelayEnhancers);
  const dislikeHandler = () =>
    removeFromLikedVideos(dispatchFeature, token, video._id, setDelayEnhancers);
  const watchLaterHandler = () =>
    addToWatchLater(video, dispatchFeature, token, setDelayEnhancers);
  const removeWatchLaterHandler = () =>
    removeFromWatchLater(dispatchFeature, token, video._id, setDelayEnhancers);
  const historyHandler = (id, video) => {
    addToHistory(video, dispatchFeature, token);
    navigate(`/home/video/${id}`);
  };
  return (
    videos.length > 0 &&
    video && (
      <div
        className="flex flex-wrap"
        style={{ backgroundColor: "var(--primary-300)" }}
      >
        {visible && <Modal setVisible={setVisible} video={video} />}{" "}
        <div
          className="flex flex-column screen"
          style={{ flex: 3, boxShadow: "0px 0px 16px var(--white)" }}
        >
          <div key={video.id}>
            <iframe
              src={`https://www.youtube.com/embed/${video_id}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div
              className="flex flex-wrap justify-space-between"
              style={{ gap: "1rem" }}
            >
              <h2 className="text-white video-title">{video.title}</h2>
              <section className="flex align-center video-opt">
                <div style={{ width: "var(--size-12)" }}>
                  {likeHandle ? (
                    <SmallLoader />
                  ) : likelist.find(
                      (likedVideo) => likedVideo._id === video._id
                    ) ? (
                    <AiFillLike
                      onClick={dislikeHandler}
                      color="var(--primary-400)"
                    />
                  ) : (
                    <AiFillLike onClick={likeHandler} color="var(--white)" />
                  )}
                </div>
                <div style={{ width: "var(--size-12)" }}>
                  {watchLaterHandle ? (
                    <SmallLoader />
                  ) : watchlater.find(
                      (watchLaterVideo) => watchLaterVideo._id === video._id
                    ) ? (
                    <BsFillBookmarkCheckFill
                      onClick={removeWatchLaterHandler}
                      color="var(--primary-400)"
                    />
                  ) : (
                    <BsFillBookmarkFill
                      onClick={watchLaterHandler}
                      color="var(--white)"
                    />
                  )}
                </div>

                <MdPlaylistAdd
                  color="var(--white)"
                  onClick={() => setVisible(true)}
                />
              </section>
            </div>
            <p className="text-white video-desc">{video.description}</p>
          </div>
        </div>
        <div
          className=" flex flex-column align-center justify-space-around recommendations-tab"
          style={{ filter: "brightness(0.5)" }}
        >
          <h2 className="text-white ">Recommendations</h2>
          {videos.map((checkVideo) => {
            return (
              checkVideo.categoryName === video.categoryName &&
              checkVideo.video_id !== video_id && (
                <div
                  onClick={() =>
                    historyHandler(checkVideo.video_id, checkVideo)
                  }
                  className="flex flex-column align-center"
                  key={checkVideo._id}
                  style={{
                    maxWidth: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <img src={checkVideo.display_img} alt={checkVideo.title} />
                  <h2 className="text-white ">{checkVideo.title}</h2>
                </div>
              )
            );
          })}
        </div>
      </div>
    )
  );
}
