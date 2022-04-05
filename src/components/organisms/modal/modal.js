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
export function Modal({ setVisible, video }) {
  const [text, setText] = useState("");
  const { dispatchFeature, playlists } = useFeature();
  const { token } = useAuth();
  const addPlaylist = () => {
    text.length
      ? generatePlaylist(text, dispatchFeature, token)
      : alert("Mera naam kya hai? Mujhe naam do");
    setText("");
  };

  const deletePlaylist = (id) => removePlaylist(dispatchFeature, token, id);
  const addToPlaylist = (id) =>
    addVideoToPlaylist(dispatchFeature, token, id, video);
  return (
    <div className="modalBackground flex justify-center align-center">
      <div className="modalContainer flex flex-column text-white">
        <h1
          className="text-white cross-for-chips text-center"
          onClick={() => setVisible(false)}
        >
          Close
        </h1>
        <section
          className="flex align-center justify-space-between"
          style={{ marginBottom: "1rem" }}
        >
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
            btnClass="primary-video btn bold text-white"
            btnStyle={{ padding: " 0 10px" }}
          />
        </section>
        <ul className="list-noneOrdered">
          {playlists.map((playlist) => (
            <li
              key={playlist._id}
              className="text-white flex align-center"
              style={{ gap: "1rem" }}
            >
              <MdOutlineAddCircle
                onClick={() => addToPlaylist(playlist._id)}
                style={{
                  borderRadius: "10px",
                  fontSize: "var(--size-16)",
                  color: "var(--red-400)",
                  boxShadow: "inset 2px 2px 8px var(--white)",
                }}
              />
              {playlist.title}
              <AiFillDelete
                onClick={() => deletePlaylist(playlist._id)}
                style={{
                  borderRadius: "10px",
                  fontSize: "var(--size-16)",
                  color: "var(--secondary-300)",
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
