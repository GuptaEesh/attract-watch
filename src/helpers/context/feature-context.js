import { createContext, useContext, useReducer } from "react";
import { featureReducer } from "../reducers/feature-reducer";
import { useAuth } from "./auth-context";

const FeatureContext = createContext();

const FeatureProvider = ({ children }) => {
  const { userData } = useAuth();
  const [feature, dispatchFeature] = useReducer(featureReducer, {
    likes: userData.likes,
    watchlater: userData.watchlater,
    history: userData.history,
    playlists: userData.playlists,
  });
  const likelist = feature.likes;
  const watchlater = feature.watchlater;
  const history = feature.history;
  const playlists = feature.playlists;
  return (
    <FeatureContext.Provider
      value={{ history, likelist, watchlater, playlists, dispatchFeature }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

const useFeature = () => useContext(FeatureContext);
export { useFeature, FeatureProvider };
