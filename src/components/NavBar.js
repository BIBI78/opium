import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

// NAV BAR NOT ALIGNED 
const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.beat("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

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
  
  const loggedInIcons = (
    <>
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

            <span className={styles.navBarIconsText}> SIGN OUT</span>
        </i>
      </NavLink>

      <NavLink
        className={styles.navBarIcons}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar
          src={currentUser?.profile_image}
          text="PROFILE" height={40}
        />
         
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.navBarIcons}
        activeClassName={styles.Active}
        to="/signin"
      >
  

        <i className={`fas fa-sign-in-alt ${styles.navBarIcons}`}>
            <span className={styles.navBarIconsText}> SIGN IN</span>
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
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addBeatIcon} 
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
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
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
