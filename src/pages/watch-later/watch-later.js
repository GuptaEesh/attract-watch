import { VideoCard } from "../../components";
import { useFeature } from "../../helpers";
import { EmptyPage } from "../empty-page";
export function WatchLaterPage() {
  const { watchlater } = useFeature();
  return (
    <div
      className="flex flex-column align-center"
      style={{
        margin: "1rem",
        width: "80vw",
      }}
    >
      <h1 className="text-white">Watch Later Videos ({watchlater.length})</h1>
      {watchlater.length === 0 ? (
        <EmptyPage emptyPageMessage="jo baad mai yaad hi na aayen" />
      ) : (
        <div
          className="flex flex-wrap justify-space-around selected-list"
          style={{ margin: "2rem", gap: "2rem" }}
        >
          {watchlater.map((likedVideo) => {
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
