import { Button, VideoCard } from "../../components";
import {
  deleteAllHistory,
  deleteFromHistory,
  useAuth,
  useFeature,
} from "../../helpers";
import { EmptyPage } from "../empty-page";
import { AiFillDelete } from "react-icons/ai";
export function HistoryPage() {
  const { history, dispatchFeature } = useFeature();
  const { token } = useAuth();
  const removeFromHistory = (_id) =>
    deleteFromHistory(dispatchFeature, token, _id);
  const clearHistory = () => deleteAllHistory(dispatchFeature, token);
  return (
    <div
      className="flex flex-column align-center"
      style={{
        margin: "1rem",
        width: "80vw",
      }}
    >
      <section
        className="flex flex-column align-center"
        style={{ gap: "1rem" }}
      >
        <h1 className="text-white">Watched Videos ({history.length})</h1>
        {history.length !== 0 && (
          <Button
            btnText="Clear History"
            btnClass="primary-video btn text-white bold"
            btnFunc={clearHistory}
          />
        )}
      </section>
      {history.length === 0 ? (
        <EmptyPage emptyPageMessage="ki aap bina video dekhen chle jaayen" />
      ) : (
        <div
          className="flex flex-wrap justify-space-around selected-list"
          style={{ margin: "2rem", gap: "2rem" }}
        >
          {
            //Have to add history card here
            history.map((historyVideo) => {
              const {
                display_img: img,
                description: desc,
                title,
                _id,
                likes,
                views,
              } = historyVideo;
              return (
                <div
                  key={_id}
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    position: "relative",
                  }}
                >
                  <VideoCard
                    video={historyVideo}
                    likes={likes}
                    views={views}
                    img={img}
                    desc={desc}
                    title={title}
                    id={_id}
                    cardStyle="flex history-card text-white"
                    cardHeader="historyVideo"
                  />
                  (
                  <AiFillDelete
                    onClick={() => removeFromHistory(_id)}
                    style={{
                      position: "absolute",
                      right: "4%",
                      top: "15%",
                    }}
                  />
                  )
                </div>
              );
            })
          }
        </div>
      )}
    </div>
  );
}
