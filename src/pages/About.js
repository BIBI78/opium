import React from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from '../styles/About.module.css';
import logo00 from "../assets/00logo.jpg";

function About() {
  return (
    <Container className={styles.Content}>
      <h2>
       <img src={logo00} alt="logo" height="45" />
      </h2>
      <hr />
       {/* <p>
      Welcome to Opium 
      </p> */}
      <p>
      Upload 30 second snippets of your own beats and share them with the community 
      </p>
      <p>
        Opium just wants to make it simple for producers, rappers and fans of music to cut through the nonsense of social media 
        and get to straight to the music.
      </p>
      <p>
        Sign up , create a profile and start uploading mp3s.
        Like most social media , you follow your favorite users, like and comment on posts.
        You also have the possiblities of quickily giving feedback with the feeback buttons we've provided. If the beat is TRASH let em know,
        If the beat is COLD let em know. Etc 
        Also yoou can leave a star rating out of 5.

      </p>
      
      <br />
      {/* <h2>
        <strong>Social Media:</strong>
      </h2> */}
      <hr />
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
      <p id={styles.Disclaimer}>
        Paris, France
        <br />
        Free Young Thug.
      </p>
    </Container>
  );
}

export default About;