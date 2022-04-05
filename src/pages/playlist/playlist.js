import { AiFillDelete } from "react-icons/ai";
import { IoOpenSharp } from "react-icons/io5";
import "./playlist.css";
import { removePlaylist, useAuth, useFeature } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { EmptyPage } from "../empty-page";
export function PlayListPage() {
  const { playlists, dispatchFeature } = useFeature();
  const { token } = useAuth();
  const navigate = useNavigate();
  const deletePlaylist = (id) => removePlaylist(dispatchFeature, token, id);
  return (
    <div className="flex flex-column" style={{ width: "100%" }}>
      <h1 className="text-white text-center bold" style={{ margin: "1rem" }}>
        Playlists ({playlists.length})
      </h1>
      {playlists.length === 0 ? (
        <EmptyPage emptyPageMessage="add kro kuch to playlist mai" />
      ) : (
        <div
          className="flex flex-column"
          style={{ marginTop: "1rem", gap: "2rem" }}
        >
          {playlists.map(({ _id, title }) => (
            <section
              key={_id}
              style={{ gap: "1rem" }}
              className=" flex align-center justify-space-around"
            >
              <h1 className="text-white">
                PlayList Name :{" "}
                <span
                  className="text-blue bold size-16"
                  style={{
                    backgroundColor: "var(--white)",
                    padding: "5px",
                    borderRadius: "0.5rem",
                  }}
                >
                  {title}
                </span>
              </h1>
              <IoOpenSharp
                onClick={() => navigate(`/playlist/${_id}`)}
                className="openPlaylist"
              />
              <AiFillDelete
                className="deletePlaylist"
                onClick={() => deletePlaylist(_id)}
              />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
