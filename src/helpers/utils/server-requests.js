import { getConfig } from "./server-helper";
import axios from "axios";
const getData = () =>
  Promise.all([axios.get("/api/videos"), axios.get("/api/categories")]);

const loginHandler = async (e, setFormFields, login, formFields) => {
  const { email, password } = formFields;
  e.preventDefault();
  try {
    setFormFields({ ...formFields, loader: true });
    const { data } = await axios.post("/api/auth/login", {
      email,
      password,
    });
    setFormFields({ ...formFields, email: "", password: "", loader: false });
    login(data);
  } catch (err) {
    setFormFields({ ...formFields, email: "", password: "", error: true });
    setTimeout(
      () =>
        setFormFields({
          ...formFields,
          email: "",
          password: "",
          error: false,
        }),
      1500
    );
  }
};
const signUpHandler = async (e, setFormFields, login, formFields) => {
  const { name, email, password, confirmPass } = formFields;
  e.preventDefault();
  try {
    if (password !== confirmPass) throw "passwordError";
    setFormFields({ ...formFields, loader: true });
    const response = await axios.post("/api/auth/signup", {
      name,
      email,
      password,
    });
    setFormFields({ ...formFields, loader: false });
    login(response.data);
  } catch (err) {
    setFormFields({
      ...formFields,
      error: true,
      message:
        err === "passwordError"
          ? "Passwords don't match"
          : "Directly login, you are our user.",
    });
    setTimeout(() => setFormFields({ ...formFields, error: false }), 1500);
  }
};

const addToLikedVideos = async (
  video,
  dispatchFeature,
  token,
  setDelayEnhancers
) => {
  try {
    setDelayEnhancers((loaders) => ({ ...loaders, likeHandle: true }));
    const response = await axios.post(
      "/api/user/likes",
      {
        video,
      },
      getConfig(token)
    );
    setDelayEnhancers((loaders) => ({ ...loaders, likeHandle: false }));

    dispatchFeature({
      type: "LIKED_VIDEOS_HANDLER",
      payload: response.data.likes,
    });
  } catch (e) {
    alert("Some error occured!");
  }
};
const removeFromLikedVideos = async (
  dispatchFeature,
  token,
  id,
  setDelayEnhancers
) => {
  try {
    setDelayEnhancers((loaders) => ({ ...loaders, likeHandle: true }));
    const response = await axios.delete(
      `/api/user/likes/${id}`,
      getConfig(token)
    );
    setDelayEnhancers((loaders) => ({ ...loaders, likeHandle: false }));
    dispatchFeature({
      type: "LIKED_VIDEOS_HANDLER",
      payload: response.data.likes,
    });
  } catch (e) {
    alert("Some error occured!");
  }
};
const addToWatchLater = async (
  video,
  dispatchFeature,
  token,
  setDelayEnhancers
) => {
  try {
    setDelayEnhancers((loaders) => ({ ...loaders, watchLaterHandle: true }));
    const response = await axios.post(
      "/api/user/watchlater",
      {
        video,
      },
      getConfig(token)
    );
    setDelayEnhancers((loaders) => ({ ...loaders, watchLaterHandle: false }));

    dispatchFeature({
      type: "WATCHLATER_VIDEOS_HANDLER",
      payload: response.data.watchlater,
    });
  } catch (e) {
    alert("Some error occured!");
  }
};
const removeFromWatchLater = async (
  dispatchFeature,
  token,
  id,
  setDelayEnhancers
) => {
  try {
    setDelayEnhancers((loaders) => ({ ...loaders, watchLaterHandle: true }));
    const response = await axios.delete(
      `/api/user/watchlater/${id}`,
      getConfig(token)
    );
    setDelayEnhancers((loaders) => ({ ...loaders, watchLaterHandle: false }));
    dispatchFeature({
      type: "WATCHLATER_VIDEOS_HANDLER",
      payload: response.data.watchlater,
    });
  } catch (e) {
    alert("Some error occured!");
  }
};
const addToHistory = async (video, dispatchFeature, token) => {
  try {
    const response = await axios.post(
      "/api/user/history",
      { video },
      getConfig(token)
    );
    dispatchFeature({
      type: "HISTORY_HANDLER",
      payload: response.data.history,
    });
  } catch (e) {
    alert("Some error occured!");
  }
};
const deleteFromHistory = async (dispatchFeature, token, id) => {
  try {
    const response = await axios.delete(
      `/api/user/history/${id}`,
      getConfig(token)
    );
    dispatchFeature({
      type: "HISTORY_HANDLER",
      payload: response.data.history,
    });
  } catch (e) {
    alert("Some error occured!");
  }
};
const deleteAllHistory = async (dispatchFeature, token) => {
  try {
    const response = await axios.delete(
      "/api/user/history/all",
      getConfig(token)
    );
    dispatchFeature({
      type: "HISTORY_HANDLER",
      payload: response.data.history,
    });
  } catch (e) {
    alert("Some error occured!");
  }
};
const generatePlaylist = async (text, dispatchFeature, token, setSnackBar) => {
  try {
    setSnackBar({
      isSnackBarVisible: true,
      snackMessage: "Playlist generated !",
    });
    const response = await axios.post(
      "/api/user/playlists",
      {
        playlist: { title: text },
      },
      getConfig(token)
    );
    setSnackBar({
      isSnackBarVisible: false,
      snackMessage: "",
    });
    dispatchFeature({
      type: "PLAYLIST_HANDLER",
      payload: response.data.playlists,
    });
  } catch (e) {
    alert("Some error occured!");
  }
};
const removePlaylist = async (dispatchFeature, token, id, setSnackBar) => {
  try {
    setSnackBar({
      isSnackBarVisible: true,
      snackMessage: "Playlist deleted !",
    });
    const response = await axios.delete(
      `/api/user/playlists/${id}`,
      getConfig(token)
    );
    setSnackBar({
      isSnackBarVisible: false,
      snackMessage: "",
    });
    dispatchFeature({
      type: "PLAYLIST_HANDLER",
      payload: response.data.playlists,
    });
  } catch (e) {
    alert("Some error occured!");
  }
};
const addVideoToPlaylist = async (
  dispatchFeature,
  token,
  id,
  video,
  setSnackBar
) => {
  try {
    setSnackBar({
      isSnackBarVisible: true,
      snackMessage: "Video added to playlist !",
    });
    await axios.post(
      `/api/user/playlists/${id}`,
      {
        video,
      },
      getConfig(token)
    );
    const playListResponse = await axios.get(
      `/api/user/playlists`,
      getConfig(token)
    );
    setSnackBar({
      isSnackBarVisible: false,
      snackMessage: "",
    });
    dispatchFeature({
      type: "PLAYLIST_HANDLER",
      payload: playListResponse.data.playlists,
    });
  } catch (e) {
    alert("Some error occured!");
  }
};
const removeVideoFromPlaylist = async (
  dispatchFeature,
  token,
  id,
  videoId,
  setSnackBar
) => {
  try {
    setSnackBar({
      isSnackBarVisible: true,
      snackMessage: "Removed video from playlist !",
    });
    const response = await axios.delete(
      `/api/user/playlists/${id}/${videoId}`,

      getConfig(token)
    );
    const playListResponse = await axios.get(
      `/api/user/playlists`,
      getConfig(token)
    );
    setSnackBar({
      isSnackBarVisible: false,
      snackMessage: "",
    });
    dispatchFeature({
      type: "PLAYLIST_HANDLER",
      payload: playListResponse.data.playlists,
    });
  } catch (e) {
    alert("Some error occured!");
  }
};

export {
  loginHandler,
  signUpHandler,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  addToLikedVideos,
  generatePlaylist,
  removePlaylist,
  removeFromLikedVideos,
  deleteAllHistory,
  deleteFromHistory,
  addToHistory,
  getData,
  addToWatchLater,
  removeFromWatchLater,
};
