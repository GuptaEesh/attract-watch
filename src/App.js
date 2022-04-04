import "./App.css";
import { DataProvider } from "./helpers";
import { Routes, Route } from "react-router-dom";
import { Home, Login, SignUp } from "./pages";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginMe" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
