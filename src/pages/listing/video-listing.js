import { useState } from "react";
import { Loader, SmallNav, VideoCard } from "../../components";
import { useData } from "../../helpers";
export function VideoListingPage() {
  const { loader, videos } = useData();
  const [selectedVideos, setSelectedVideos] = useState(videos);
  const [selectedCategory, setSelectedCategory] = useState("All");
  let showVideos = selectedVideos.length === 0 ? videos : selectedVideos;
  return (
    <div className="flex flex-column" style={{ flex: 1 }}>
      <SmallNav
        setSelectedVideos={setSelectedVideos}
        setSelectedCategory={setSelectedCategory}
      />
      <h1 className="text-white text-center" style={{ margin: "1rem" }}>
        {" "}
        Showing results for{" "}
        <span className="text-red bold size-16">{selectedCategory}</span>{" "}
      </h1>
      {loader ? (
        <div
          className="flex align-center flex-column justify-center"
          style={{ marginTop: "20vh" }}
        >
          <Loader />
          <h2 className="text-white">Loading your videos! Hang in with us</h2>
        </div>
      ) : (
        <div
          className="flex flex-wrap justify-space-between selected-list"
          style={{ gap: "1rem" }}
        >
          {[...showVideos].map(
            ({
              id,
              display_img: img,
              views,
              description: desc,
              title,
              likes,
            }) => (
              <VideoCard
                key={id}
                likes={likes}
                views={views}
                cardStyle="eg-card ecomm-card text-white"
                id={id}
                img={img}
                desc={desc}
                title={title}
                cardHeader="listedVideo"
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
