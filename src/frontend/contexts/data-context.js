import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(
    () =>
      (async function () {
        console.log("useEffect");
        try {
          const response = await axios.get("/api/products");
          const res = response.data.products;
          setData(res);
        } catch (error) {
          console.error(error);
        }
      })(),
    []
  );

  console.log("data context data-", data);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
