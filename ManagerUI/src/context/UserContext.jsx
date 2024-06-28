import { createContext, useState } from "react";
import React from "react";

// @function  UserContext
const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    role: "",
    auth: false,
  });

  const login = (username, role) => {
    setUser((user) => ({
      name: username,
      role: role,
      auth: true,
    }));
    sessionStorage.setItem("name", username);
    sessionStorage.setItem("role", role);
  };

  const logout = () => {
    setUser((user) => ({
      name: "",
      role: "",
      auth: false,
    }));
    sessionStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
