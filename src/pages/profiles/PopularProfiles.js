/* eslint-disable */
// React import
import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";

// Styles and CSS
import appStyles from "../../App.module.css";

// Assets, Profiledata context, also the weather widget library
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

/**
 * Component for displaying popular profiles.
 * 
 * Displays a list of the most followed profiles.
 * Renders profiles differently on mobile view.
 */
const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <>
      <Container
        className={`${appStyles.Content} ${mobile && "d-lg-none text-center mt-5 mb-3"
          }`}
      >
        {popularProfiles.results.length ? (
          <>
            <p>Most followed profiles.</p>
            {mobile ? (
              <div className="d-flex justify-content-around">
                {/* Render profiles in a row for mobile view */}
                {popularProfiles.results.slice(0, 4).map((profile) => (
                  <Profile key={profile.id} profile={profile} mobile />
                ))}
              </div>
            ) : (
              // Render profiles normally for desktop view
              popularProfiles.results.map((profile) => (
                <Profile key={profile.id} profile={profile} />
              ))
            )}
          </>
        ) : (
          // Show spinner while loading profiles
          <Asset spinner />
        )}
      </Container>
    </>
  );
};

export default PopularProfiles;
