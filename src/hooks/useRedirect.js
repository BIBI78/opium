import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

/**
 * Custom hook to handle redirect based on user authentication status.
 * Redirects to the home page if the user is logged in, otherwise redirects to the home page.
 */

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
