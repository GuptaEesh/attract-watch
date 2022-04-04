import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      setLoader(true);
      const apiData = await Promise.all([
        axios.get("api/videos"),
        axios.get("api/categories"),
      ]);
      setLoader(false);
      setVideos(apiData[0].data.videos);
      setCategories(apiData[1].data.categories);
    })();
  }, []);
  return (
    <DataContext.Provider value={{ categories, videos, loader }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
