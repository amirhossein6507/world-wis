import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:3020/cities";

const CitesContext = createContext();

const CitesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  const fetchCurrentCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createdNewCity = async (newCity) => {
    setIsLoading(true);
    try {
      await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCities((cur) => [...cur, newCity]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async (id) => {
    setIsLoading(true);
    try {
      fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      setCities((cur) => cur.filter((city) => city.id !== id));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitesContext.Provider
      value={{
        cities,
        isLoading,
        fetchCurrentCity,
        currentCity,
        createdNewCity,
        deleteCity,
      }}
    >
      {children}
    </CitesContext.Provider>
  );
};

const useCities = () => {
  const contextValue = useContext(CitesContext);
  if (contextValue == undefined)
    throw new Error("use cities context outside Provider");
  return contextValue;
};

// eslint-disable-next-line react-refresh/only-export-components
export { CitesProvider, useCities };
