import "./App.css";
import { DataProvider, FeatureProvider } from "./helpers";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  Login,
  PrivateRoute,
  SignUp,
  HistoryPage,
  VideoListingPage,
  LikedVideosPage,
  WatchLaterPage,
  SingleVideoPage,
  SinglePlayList,
  PlayListPage,
} from "./pages";
import { SideNav } from "./components";

function App() {
  const location = useLocation();
  const routeCheck =
    location.pathname === "/" ||
    location.pathname === "/loginMe" ||
    location.pathname === "/signup";
  return (
    <div className="App">
      <DataProvider>
        <FeatureProvider>
          {!routeCheck && <SideNav />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loginMe" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/home"
              element={<PrivateRoute component={<VideoListingPage />} />}
            />
            <Route
              path="/home/video/:id"
              element={<PrivateRoute component={<SingleVideoPage />} />}
            />
            <Route
              path="/liked"
              element={<PrivateRoute component={<LikedVideosPage />} />}
            />
            <Route
              path="/watchlater"
              element={<PrivateRoute component={<WatchLaterPage />} />}
            />
            <Route
              path="/history"
              element={<PrivateRoute component={<HistoryPage />} />}
            />
            <Route
              path="/playlist"
              element={<PrivateRoute component={<PlayListPage />} />}
            />
            <Route
              path="/playlist/:id"
              element={<PrivateRoute component={<SinglePlayList />} />}
            />
          </Routes>
        </FeatureProvider>
      </DataProvider>
    </div>
  );
}

export default App;
