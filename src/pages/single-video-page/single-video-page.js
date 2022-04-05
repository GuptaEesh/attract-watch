import { useParams } from "react-router-dom";
import { MyYouTube } from "../../components";
import { useState, useEffect } from "react";
import { getData, useData } from "../../helpers";

export function SingleVideoPage() {
  const { id: video_id } = useParams();
  const { videos, setVideos } = useData();
  const [video, setVideo] = useState(null);
  useEffect(() => {
    if (videos.length === 0)
      (async () => {
        const apiData = await getData();
        setVideo(
          apiData[0].data.videos.filter(
            (video) => video.video_id === video_id
          )[0]
        );
        setVideos(apiData[0].data.videos);
      })();
    else {
      setVideo(videos.filter((video) => video.video_id === video_id)[0]);
    }
  }, [video_id]);
  return <MyYouTube video_id={video_id} video={video} videos={videos} />;
}
