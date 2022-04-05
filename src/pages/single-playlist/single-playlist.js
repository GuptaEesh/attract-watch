import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { removeVideoFromPlaylist, useAuth, useFeature } from "../../helpers";
import { GiCrossMark } from "react-icons/gi";
import { getConfig } from "../../helpers/utils/server-helper";
import { Loader, VideoCard } from "../../components";

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
  console.log(playlists);
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
    <div
      className="flex flex-column text-white align-center justify-center"
      style={{ width: "80vw" }}
    >
      <Loader />
      <h1>Loading your loved videos</h1>
    </div>
  ) : (
    <div
      className="flex flex-column align-center"
      style={{
        margin: "1rem",
        width: "80vw",
      }}
    >
      <h1 className="text-white" style={{ margin: "1rem" }}>
        {" "}
        Playlist : {playlistName}
      </h1>
      <div className="flex flex-wrap justify-space-between">
        {videos &&
          videos.map((video) => {
            const {
              _id,
              title,
              display_img: img,
              description: desc,
              likes,
              views,
            } = video;
            return (
              <div
                key={_id}
                style={{
                  height: "max-content",
                  backgroundColor: "var(--white-200)",
                  padding: "var(--size-16)",
                  position: "relative",
                  width: "max-content",
                }}
              >
                <GiCrossMark
                  color="var(--white)"
                  onClick={() => removeVideo(_id)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "2%",
                    right: "5%",
                  }}
                />
                <div
                  className="flex justify-space-around "
                  style={{ gap: "1rem" }}
                >
                  <VideoCard
                    video={video}
                    img={img}
                    desc={desc}
                    title={title}
                    likes={likes}
                    views={views}
                    id={_id}
                    cardStyle="playlist-card"
                    cardHeader="playListedVideo"
                  />
                  <section
                    className="flex flex-wrap"
                    style={{ gap: "1rem" }}
                  ></section>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
