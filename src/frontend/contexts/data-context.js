import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

const useData = () => useContext(DataContext);

function DataProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(
    () =>
      (async function () {
        try {
          const response = await axios.get("/api/products");
          // console.log(response);
          const res = response.data.products;
          setData(res);
        } catch (error) {
          console.error(error);
        }
      })(),
    []
  );

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export { useData, DataProvider };
