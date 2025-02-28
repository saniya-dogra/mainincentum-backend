import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setReady(true);  // Ensure this happens after data is set
      });
  }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {ready ? children : <div>Loading...</div>}
    </UserContext.Provider>
  );
}
