import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = () => {
  const storedData = JSON.parse(localStorage.getItem("user"));
  return {
    user: storedData || null,
    isAuthenticated: !!storedData,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    null,
    initialState,
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      alert("please check email or password");
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (isAuthenticated) localStorage.setItem("user", JSON.stringify(user));
  }, [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authValue = useContext(AuthContext);
  if (authValue == undefined)
    throw new Error("use authintcation outside provider");
  return authValue;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
