import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null); // null indicates "not fetched yet"
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
          withCredentials: true, // Send JWT cookie
        });
        console.log("Profile response:", response.data); // Debug log
        // Assuming response.data.data contains the user object
        const userData = response.data.data || response.data; // Handle nested or flat response
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error.response?.data || error.message);
        setUser(null); // No user if fetch fails (e.g., not logged in)
      } finally {
        setReady(true); // Mark as ready regardless of success/failure
      }
    };

    // Only fetch if no user is set yet (e.g., on page refresh)
    if (!user) {
      fetchUserProfile();
    } else {
      setReady(true); // If user is already set (e.g., from login), skip fetch
    }
  }, []); // Empty dependency array for mount-only fetch

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {ready ? children : <div className="flex items-center justify-center min-h-screen">Loading...</div>}
    </UserContext.Provider>
  );
}