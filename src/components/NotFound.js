import React from 'react';
import { Container } from 'react-bootstrap';
import styles from '../styles/NotFound.module.css';
import fourohfour from '../assets/404.png';

/**
 * Display error graphic for non-existent pages.
 */
function NotFound() {
    return (
        <Container>
            <div className={styles.ErrorGraphic}>
                <img src={fourohfour} alt="404 Error. Page not found." />
            </div>
        </Container>
    );
}

export default NotFound;