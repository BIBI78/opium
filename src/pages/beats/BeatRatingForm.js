import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Rating } from "react-simple-star-rating";
import { axiosRes, axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Modal.module.css";

/**
 * Component for managing beat ratings.
 * 
 * Renders a star rating input and handles rating submission.
 * Shows modals for successful submission, already rated beat, and owner rating attempt.
 * Fetches user's previous rating for the beat on mount.
 */
function BeatRatingForm(props) {
  // Destructure props
  const { beat, setBeat, id, owner } = props;

  // State variables for rating, modals, and user's previous rating
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [noRateModal, setNoRateModal] = useState(false);
  const [ownerRateModal, setOwnerRateModal] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // Function to handle rating selection
  const handleRating = (rate) => {
    setRating(rate);
  };

  // Function to handle rating submission
  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: ratingsData } = await axiosReq.get(`/rating/`);
      const userRating = ratingsData.results.find((rating) => {
        return (
          rating.owner === currentUser?.username &&
          rating.beat === parseInt(id, 10)
        );
      });

      if (userRating) {
        setNoRateModal(true);
        setTimeout(() => setNoRateModal(false), 3000);
        return;
      }

      if (is_owner) {
        setOwnerRateModal(true);
        setTimeout(() => setOwnerRateModal(false), 3000);
        return;
      }

      await axiosRes.post("/rating/", {
        beat,
        rating,
      });

      setBeat((prevBeat) => ({
        ...prevBeat,
        results: prevBeat.results.map((beat) => {
          return beat.id === parseInt(id)
            ? {
              ...beat,
              rating: beat.rating,
              ratings_count: beat.ratings_count + 1,
            }
            : beat;
        }),
      }));

      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      setRating(0);
    } catch (err) {
      console.error(err);
    }
  };

  // Effect hook to fetch user's previous rating for the beat on mount
  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const { data: ratingsData } = await axiosReq.get(`/rating/`);
        const userRating = ratingsData.results.find((rating) => {
          return (
            rating.owner === currentUser?.username &&
            rating.beat === parseInt(id, 10)
          );
        });
        setUserRating(userRating);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserRating();
  }, [currentUser, id]);

  // Effect hook to set star color
  useEffect(() => {
    const starRatingElements = document.querySelectorAll('.style-module_simpleStarRating__nWUxf');
    starRatingElements.forEach(element => {
      const filledIcons = element.querySelector('.style-module_fillIcons__6---A');
      filledIcons.style.color = '#e0a800;';
    });
  }, []);

  // Hide the button if user has already rated the beat
  const submitButton = userRating ? null : (
    <button
      className={`${btnStyles.Button} ${btnStyles.Bright}`}
      type="submit"
    >
      Submit
    </button>
  );

  // Hide the entire rating section if the user has already rated the beat
  const ratingSection = userRating ? null : (
    <>
      <div className="text-center rateBeat" style={{ fontFamily: 'Noto Sans Sharada', color: 'grey' }}>Rate This Beat</div>
      <Form className="mt-2 pb-4" onSubmit={handleRatingSubmit}>
        <div className="text-center p-1 mb-1">
          <Rating onClick={handleRating} />
        </div>
        {submitButton}
      </Form>
    </>
  );

  return (
    <>
      {ratingSection}
      {/* Modals */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={styles.Psuccess}>
            Thanks for the feedback.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={noRateModal} onHide={() => setNoRateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Sorry, you have already rated this beat.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setNoRateModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={ownerRateModal} onHide={() => setOwnerRateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You can't rate your own music.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOwnerRateModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BeatRatingForm;
