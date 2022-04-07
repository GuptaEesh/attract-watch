import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  return (
    <DataContext.Provider
      value={{
        categories,
        setLoader,
        setVideos,
        setCategories,
        videos,
        loader,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
