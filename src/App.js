import "./App.css";
import { DataProvider } from "./helpers/data-context";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
