import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

import { useCurrentUser } from "./contexts/CurrentUserContext";

import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from './components/NotFound';

// BEATS
import BeatCreateForm from "./pages/beats/BeatCreateForm";
import BeatPage from "./pages/beats/BeatPage";
import BeatsPage from "./pages/beats/BeatsPage";
import BeatEditForm from "./pages/beats/BeatEditForm";
import About from './pages/About';

// URL ICON
import React, { useEffect } from "react";
import logo from "./assets/logo.png";

/**
 * Main component for the application.
 * 
 * Renders the navigation bar and routes for different pages.
 */
function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  // Add favicon
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "logo";
    link.href = logo;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className={styles.App}>
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <Container className={styles.Main}>
        <Switch>
          {/* Routes */}
          <Route exact path="/" render={() => <BeatsPage message="No results found. Adjust the search keyword." />} />
          <Route exact path="/feed" render={() => <BeatsPage message="No results found. Adjust the search keyword or follow a user." filter={`owner__followed__owner__profile=${profile_id}&`} />} />
          <Route exact path="/liked" render={() => <BeatsPage message="No results found. Adjust the search keyword or like for thst type of beat." filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`} />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/beats/:id/edit" render={() => <BeatEditForm />} />
          <Route exact path="/beats/:id" render={() => <BeatPage />} />
          <Route exact path="/mybeats/create" render={() => <BeatCreateForm />} />
          <Route exact path="/about" render={() => <About />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
