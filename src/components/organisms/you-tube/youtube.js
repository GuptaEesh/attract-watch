import "./youtube.css";
import { AiFillLike } from "react-icons/ai";
import { BsFillBookmarkFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { useState } from "react";
import {
  addToHistory,
  addToLikedVideos,
  addToWatchLater,
  removeFromLikedVideos,
  removeFromWatchLater,
  useAuth,
  useFeature,
} from "../../../helpers";
import { SmallLoader } from "../../";
import { useNavigate } from "react-router-dom";
export function MyYouTube({ video_id, video, videos }) {
  const { dispatchFeature, likelist, watchlater } = useFeature();
  const { token, setModal } = useAuth();
  const navigate = useNavigate();
  const [delayEnhancers, setDelayEnhancers] = useState({
    likeHandle: false,
    watchLaterHandle: false,
  });

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
      <div className="flex flex-wrap video-wrapper">
        <div className="flex flex-column screen flex-3 video-illuminator">
          <div key={video.id}>
            <iframe
              src={`https://www.youtube.com/embed/${video_id}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div className="flex flex-wrap justify-space-between gap-1">
              <h2 className="text-white video-title">{video.title}</h2>
              <section className="flex align-center video-opt">
                <div className="width-12">
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
                    <AiFillLike onClick={likeHandler} className="text-white" />
                  )}
                </div>
                <div className="width-12">
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
                      className="text-white"
                      onClick={watchLaterHandler}
                    />
                  )}
                </div>

                <MdPlaylistAdd
                  className="text-white"
                  onClick={() =>
                    setModal((modal) => ({ state: true, payload: video }))
                  }
                />
              </section>
            </div>
            <p className="text-white video-desc">{video.description}</p>
          </div>
        </div>
        <div className=" flex flex-column align-center justify-space-around recommendations-tab ">
          <h2 className="text-white ">Recommendations</h2>
          {videos.map((checkVideo) => {
            return (
              checkVideo.categoryName === video.categoryName &&
              checkVideo.video_id !== video_id && (
                <div
                  onClick={() =>
                    historyHandler(checkVideo.video_id, checkVideo)
                  }
                  className="flex flex-column align-center suggested-video-view"
                  key={checkVideo._id}
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
