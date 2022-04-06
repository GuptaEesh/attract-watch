import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { removeVideoFromPlaylist, useAuth, useFeature } from "../../helpers";
import { GiCrossMark } from "react-icons/gi";
import { getConfig } from "../../helpers/utils/server-helper";
import { Loader, VideoCard } from "../../components";
import "./single-playlist.css";
export function SinglePlayList() {
  const { id } = useParams();
  const { token } = useAuth();
  const { dispatchFeature, playlists } = useFeature();
  const [videos, setVideos] = useState(null);
  const [playlistName, setPlaylistName] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const removeVideo = (videoId) =>
    removeVideoFromPlaylist(dispatchFeature, token, id, videoId);
  useEffect(
    () =>
      (async () => {
        try {
          setLoader(true);
          const response = await axios.get(
            `/api/user/playlists/${id}`,
            getConfig(token)
          );
          setLoader(false);
          setVideos(response.data.playlist.videos);
          setPlaylistName(response.data.playlist.title);
        } catch (e) {
          navigate("/playlist");
        }
      })(),

    [playlists]
  );
  return loader ? (
    <div className="flex flex-column text-white align-center justify-center width-r-80">
      <Loader />
      <h1>Loading your loved videos</h1>
    </div>
  ) : (
    <div className="flex flex-column align-center margin-1 width-r-80">
      <h1 className="text-white margin-1"> Playlist : {playlistName}</h1>
      <div className="flex flex-wrap gap-1 justify-space-between">
        {videos &&
          videos.map((video) => {
            return (
              <div
                className="height-max-content width-max-content position-relative video-container"
                key={video._id}
              >
                <GiCrossMark
                  className="cursor-pointer position-absolute text-white delete-playlist-video"
                  onClick={() => removeVideo(video._id)}
                />
                <div className="flex justify-space-around gap-1 ">
                  <VideoCard
                    video={video}
                    img={video.display_img}
                    desc={video.description}
                    title={video.title}
                    likes={video.likes}
                    views={video.views}
                    id={video._id}
                    cardStyle="playlist-card"
                    cardHeader="playListedVideo"
                  />
                  <section className="flex flex-wrap gap-1"></section>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
