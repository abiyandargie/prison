import React, { createContext, useContext, useEffect, useState } from "react";

// Create the user context
const UserContext = createContext();

// Auth context provider component
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify",
            {
              Headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          // navigate('/login')
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        if (error.response && !error.response.data.error)
          // console.log(error);
          // navigate('/login')
          setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  // Login function
  const login = (user) => {
    setUser(user);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(UserContext);

export default AuthContext;
