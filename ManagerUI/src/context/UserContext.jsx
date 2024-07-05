import { createContext, useState, useEffect } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    role: "",
    auth: false,
  });

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    const name = sessionStorage.getItem("name");
    const role = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    if (id && name && role && token) {
      setUser({
        id: id,
        name: name,
        role: role,
        auth: true,
      });
    }
  }, []);

  const login = (id, username, role, token) => {
    setUser({
      id: id,
      name: username,
      role: role,
      auth: true,
    });
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("name", username);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("token", token);
  };

  const logout = () => {
    setUser({
      id: "",
      name: "",
      role: "",
      auth: false,
    });
    sessionStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
