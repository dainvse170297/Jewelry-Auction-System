import { createContext, useState } from "react";
import React from "react";

// @function  UserContext
const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    role: "",
    auth: false,
  });

  const login = (id, username, role, token) => {
    setUser((user) => ({
      id: id,
      name: username,
      role: role,
      auth: true,
    }));
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("name", username);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("token", token);
  };

  const logout = () => {
    setUser((user) => ({
      id: "",
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
