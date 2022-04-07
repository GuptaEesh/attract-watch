import { useState } from "react";
import { Input, Button } from "../../";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineAddCircle } from "react-icons/md";
import "./modal.css";
import {
  generatePlaylist,
  removePlaylist,
  addVideoToPlaylist,
  useAuth,
  useFeature,
} from "../../../helpers";
export function Modal({ video }) {
  const [text, setText] = useState("");
  const { dispatchFeature, playlists } = useFeature();
  const { token, setModal, setSnackBar } = useAuth();
  const addPlaylist = () => {
    text.length
      ? generatePlaylist(text, dispatchFeature, token, setSnackBar)
      : alert("Mera naam kya hai? Mujhe naam do");
    setText("");
  };

  const deletePlaylist = (id) =>
    removePlaylist(dispatchFeature, token, id, setSnackBar);
  const addToPlaylist = (id) =>
    addVideoToPlaylist(dispatchFeature, token, id, video, setSnackBar);
  return (
    <div className="modal-background flex justify-center align-center">
      <div className="modal-container flex flex-column text-white">
        <h1
          className="text-white cross-for-chips text-center"
          onClick={() => setModal((modal) => ({ state: false, payload: null }))}
        >
          Close
        </h1>
        <section className="flex align-center playlist-generator justify-space-between margin-bottom-1">
          <Input
            inputClass="input-text md"
            inputName="playlist"
            inputPlaceHolder="create playlist..."
            inputValue={text}
            inputFunc={(e) => setText(e.target.value)}
          />
          <Button
            btnText="Generate"
            btnFunc={addPlaylist}
            btnClass="primary-video-button btn bold text-white btn-padding-010"
          />
        </section>
        <ul className="list-noneOrdered">
          {playlists?.map((playlist) => (
            <li
              key={playlist._id}
              className="text-white flex align-center gap-1"
            >
              <MdOutlineAddCircle
                onClick={() => addToPlaylist(playlist._id)}
                className="size-16 add-song-button"
              />
              {playlist.title}
              <AiFillDelete
                onClick={() => deletePlaylist(playlist._id)}
                className="size-16 delete-playlist-button"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
