import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";

// Create context for current user
export const CurrentUserContext = createContext();
// Create context for setting current user
export const SetCurrentUserContext = createContext();

// Custom hook to access current user context
export const useCurrentUser = () => useContext(CurrentUserContext);
// Custom hook to access set current user context
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Provider component for managing current user state
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  // Function to fetch current user data on component mount
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch current user data on component mount
  useEffect(() => {
    handleMount();
  }, []);

  // Set up interceptors to handle token refresh and unauthorized requests
  useMemo(() => {
    // Request interceptor for axiosReq
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          // Redirect to sign-in page if token refresh fails
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // Response interceptor for axiosRes
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        // Handle unauthorized requests (status code 401)
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            // Redirect to sign-in page if token refresh fails
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          // Retry the failed request after token refresh
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  // Provide current user context value to child components
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
