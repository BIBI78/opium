import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

/**
 * Context to manage profile data.
 */
const ProfileDataContext = createContext();
/**
 * Context to set profile data.
 */
const SetProfileDataContext = createContext();

/**
 * Custom hook to access profile data context.
 */
export const useProfileData = () => useContext(ProfileDataContext);
/**
 * Custom hook to access set profile data context.
 */
export const useSetProfileData = () => useContext(SetProfileDataContext);

/**
 * Provider component for managing profile data state.
 * Fetches popular profiles on component mount or when current user changes.
 */
export const ProfileDataProvider = ({ children }) => {
  // State to manage profile data
  const [profileData, setProfileData] = useState({
    // Initialize with empty profile data
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  // Get current user
  const currentUser = useCurrentUser();

  /**
   * Fetch popular profiles from the API.
   */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  /**
   * Handle following a profile.
   * Updates profile data after successful follow.
   */
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handle unfollowing a profile.
   * Updates profile data after successful unfollow.
   */
  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
