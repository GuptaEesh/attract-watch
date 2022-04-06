import { useData } from "../../../helpers";
import { Button } from "../../atoms/button";
import "./nav.css";
export function SmallNav({ setSelectedVideos, setSelectedCategory }) {
  const { categories, videos } = useData();
  const categoryHandler = (name) => {
    setSelectedCategory(name);
    const filteredVideos =
      name === "All"
        ? videos
        : [...videos].filter((video) => video.categoryName === name);
    setSelectedVideos(filteredVideos);
  };
  return (
    <div className="nav-section-left flex-wrap">
      {[...categories, { id: 4, categoryName: "All" }].map(
        ({ categoryName: name, id }) => (
          <Button
            key={id}
            btnText={name}
            btnClass="bold btn primary-video-button text-white"
            btnFunc={() => categoryHandler(name)}
          />
        )
      )}
    </div>
  );
}
