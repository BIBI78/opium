import React from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from '../styles/About.module.css';
import logo00 from "../assets/00logo.jpg";
import { Link } from 'react-router-dom';

/**
 * Component for displaying information about the application.
 * 
 * Provides details about the purpose of the application and social media links.
 */
function About() {
  return (
    <Container className={styles.Content}>
      {/* Application Logo */}
      <h2>
        <img src={logo00} alt="logo" height="45" />
      </h2>
      <hr />

      {/* Application Description */}
      <p>
        Upload 30-second snippets of your own beats and share them with the community
      </p>
      <p>
        Opium just wants to make it simple for producers, rappers, and fans of music to cut through the nonsense of social media
        and get straight to the <strong>MUSIC</strong>.
      </p>
      <p>
        Sign up, create a profile, and start uploading 30-second mp3s.
        Like most social media, you follow your favorite users, like and comment on posts, and delete and disappear if you are over it.
        You also have the possibilities of quickly giving feedback with the feedback buttons we've provided.
        If the beat is TRASH, let 'em know.
        If the beat is COLD, let 'em know.
        Etc.
        You also have the option to rate with a 5-star scale.
      </p>

      {/* Sign Up and Login Links */}
      <p id={styles.Disclaimer}>
        <Link to="/signup">Sign up</Link>
        <Link to="/signin"> Login</Link>
      </p>

      <br />

      <hr />

      {/* Social Media Icons */}
      <Row className={styles.SocialIconsAlign}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit our Facebook page (opens in a new tab)"
        >
          <i className="fa-brands fa-facebook-f" />
        </a>

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit our Twitter page (opens in a new tab)"
        >
          <i className="fa-brands fa-twitter" />
        </a>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit our Instagram page (opens in a new tab)"
        >
          <i className="fa-brands fa-instagram" />
        </a>

        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit our YouTube page (opens in a new tab)"
        >
          <i className="fa-brands fa-youtube" />
        </a>

        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit my Github page (opens in a new tab)"
        >
          <i className="fa-brands fa-github" />
        </a>

        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit my Linkedin page (opens in a new tab)"
        >
          <i className="fa-brands fa-linkedin-in" />
        </a>
      </Row>

      <br />

      {/* Additional Information */}
      <p id={styles.Disclaimer}>
        <strong>Paris, France</strong>
        <br />
        <strong>Free Young Thug</strong>
      </p>
    </Container>
  );
}

export default About;
