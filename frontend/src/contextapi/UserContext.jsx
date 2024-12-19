import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Check for user token and fetch user data
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users/profile", { withCredentials: true })
      .then(response => {
        setUser(response.data); // Set user data
      })
      .catch(() => {
        setUser(null); // Clear user if token verification fails
      })
      .finally(() => {
        setReady(true); // Mark as ready
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {ready ? children : <div>Loading...</div>}
    </UserContext.Provider>
  );
}
