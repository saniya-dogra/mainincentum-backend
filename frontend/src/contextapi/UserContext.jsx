import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8080/profile', { withCredentials: true },{credentials: 'include',})
      .then((data ) => {
        console.log("Fetched profile data:", data); // Debug API response
        setUser(data); 
        setReady(true);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setReady(true); // Ensure ready is set even on failure
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
