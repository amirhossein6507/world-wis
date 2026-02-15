import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:3020/cities";

const CitesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false, error: "" };
    case "city/loaded":
      return {
        ...state,
        error: "",
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        error: "",
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        error: "",
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    default:
      throw new Error("Unkown action");
  }
};

const CitesProvider = ({ children }) => {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCities();
  }, []);

  const fetchCurrentCity = async (id) => {
    if (currentCity.id == id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const createdNewCity = async (newCity) => {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "city/created", payload: newCity });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "loading" });
    try {
      fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      console.log(error.message);
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
