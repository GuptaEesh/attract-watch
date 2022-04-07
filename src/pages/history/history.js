import { Button, VideoCard } from "../../components";
import {
  deleteAllHistory,
  deleteFromHistory,
  useAuth,
  useFeature,
} from "../../helpers";
import { EmptyPage } from "../empty-page";
import { AiFillDelete } from "react-icons/ai";
import "./history.css";
export function HistoryPage() {
  const { history, dispatchFeature } = useFeature();
  const { token } = useAuth();
  const removeFromHistory = (_id) =>
    deleteFromHistory(dispatchFeature, token, _id);
  const clearHistory = () => deleteAllHistory(dispatchFeature, token);
  return (
    <div className="flex flex-column align-center margin-1 width-r-80">
      <section className="flex flex-column align-center gap-1">
        <h1 className="text-white">Watched Videos ({history?.length})</h1>
        {history?.length !== 0 && (
          <Button
            btnText="Clear History"
            btnClass="primary-video-button btn text-white bold"
            btnFunc={clearHistory}
          />
        )}
      </section>
      {history?.length === 0 ? (
        <EmptyPage emptyPageMessage="ki aap bina video dekhen chle jaayen" />
      ) : (
        <div className="flex flex-wrap justify-space-around selected-list gap-2 margin-2">
          {history?.map((historyVideo) => {
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
                className="position-relative height-fit-content width-fit-content"
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
                  className="delete-from-history position-absolute"
                />
                )
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
