import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

/**
 * Component for rendering the navigation bar.
 * 
 * Displays navigation links and icons based on user authentication status.
 */
const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // Function to handle user sign out
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      // Redirect to the sign in page after successful logout
      history.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  // Icon for adding a beat
  const addBeatIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/mybeats/create"
    >
      <i className={`far fa-file-audio ${styles.navBarIcons}`}>
        <span className={styles.navBarIconsText}> UPLOAD BEATS </span>
      </i>
    </NavLink>
  );

  // Icons for logged in users
  const loggedInIcons = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
      >
        <i className={`fas fa-home ${styles.navBarIcons}`}>
          <span className={styles.navBarIconsText}> HOME </span>
        </i>
      </NavLink>
      <NavLink
        className={styles.navBarIcons}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className={`fas fa-stream ${styles.navBarIcons}`}>
          <span className={styles.navBarIconsText}> FEED </span>
        </i>
      </NavLink>
      <NavLink
        className={styles.navBarIcons}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className={`fas fa-heart ${styles.navBarIcons}`}>
          <span className={styles.navBarIconsText}> LIKED</span>
        </i>
      </NavLink>
      <NavLink
        className={`${styles.NavLink} ${styles.navBarIcons}`}
        to="/"
        onClick={handleSignOut}
      >
        <i className={`fas fa-sign-out-alt ${styles.navBarIcons}`}>
          <span className={styles.navBarIconsText}> LOGOUT</span>
        </i>
      </NavLink>
      <NavLink
        className={styles.navBarIcons}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar
          src={currentUser?.profile_image}
          text={currentUser?.username} // Accessing username from currentUser
          height={40}
        />
      </NavLink>
    </>
  );

  // Icons for logged out users
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.navBarIcons}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className={`fas fa-sign-in-alt ${styles.navBarIcons}`}>
          <span className={styles.navBarIconsText}> LOGIN</span>
        </i>
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className={`fas fa-user-plus ${styles.navBarIcons}`}>
          <span className={styles.navBarIconsText}> SIGN UP</span>
        </i>
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to={currentUser ? "/" : "/about"}>
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && currentUser.profile_id && addBeatIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              to="/about"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className={`fa-solid fa-book-open ${styles.navBarIcons}`}>
                <span className={styles.navBarIconsText}> ABOUT</span>
              </i>
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
