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
    <div className="flex flex-column width-p-100">
      <h1 className="text-white text-center bold margin-1">
        Playlists ({playlists.length})
      </h1>
      {playlists.length === 0 ? (
        <EmptyPage emptyPageMessage="add kro kuch to playlist mai" />
      ) : (
        <div className="flex flex-column gap-2 margin-top-1">
          {playlists.map(({ _id, title }) => (
            <section
              key={_id}
              className=" flex align-center playlist-wrapper justify-space-around gap-1"
            >
              <h1 className="text-white">
                PlayList :{" "}
                <span className="text-blue bold size-16 playlist-name">
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
