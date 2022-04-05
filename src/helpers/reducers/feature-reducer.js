const featureReducer = (feature, action) => {
  switch (action.type) {
    case "LIKED_VIDEOS_HANDLER":
      return { ...feature, likes: action.payload };
    case "WATCHLATER_VIDEOS_HANDLER":
      return { ...feature, watchlater: action.payload };
    case "HISTORY_HANDLER":
      return { ...feature, history: action.payload };
    case "PLAYLIST_HANDLER":
      return { ...feature, playlists: action.payload };
    default:
      return feature;
  }
};
export { featureReducer };
