import "./App.css";
import { DataProvider } from "./helpers";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Login, PrivateRoute, SignUp, VideoListingPage } from "./pages";
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
        {!routeCheck && <SideNav />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginMe" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={<PrivateRoute component={<VideoListingPage />} />}
          />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
