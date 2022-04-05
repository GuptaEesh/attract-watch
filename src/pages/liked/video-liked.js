import { VideoCard } from "../../components";
import { useFeature } from "../../helpers";
import { EmptyPage } from "../empty-page";
export function LikedVideosPage() {
  const { likelist } = useFeature();
  return (
    <div
      className="flex flex-column align-center"
      style={{
        margin: "1rem",
        width: "80vw",
      }}
    >
      <h1 className="text-white">Liked Videos ({likelist.length})</h1>
      {likelist.length === 0 ? (
        <EmptyPage emptyPageMessage="like thoko yrr" />
      ) : (
        <div
          className="flex flex-wrap justify-space-around selected-list"
          style={{ margin: "2rem", gap: "2rem" }}
        >
          {likelist.map((likedVideo) => {
            const {
              display_img: img,
              description: desc,
              title,
              _id,
              id,
              likes,
              views,
            } = likedVideo;
            return (
              <VideoCard
                video={likedVideo}
                likes={likes}
                views={views}
                key={id}
                img={img}
                desc={desc}
                title={title}
                id={_id}
                cardStyle="text-white ecomm-card eg-card"
                cardHeader="likedVideo"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
