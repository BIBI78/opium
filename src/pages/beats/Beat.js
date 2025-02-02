import React, { useEffect, useState } from "react";
import styles from "../../styles/Beat.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import musicImage from "../../assets/music.jpg";
import star from "../../styles/Star.module.css";
import { Rating } from "react-simple-star-rating";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import feedbackStyles from "../../styles/FeedbackButtons.module.css";

/**
 * Represents a single beat card component.
 * @param {Object} props - The props object.
 * @returns {JSX.Element} A single beat card component.
 */
const Beat = (props) => {
  // Destructuring props
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    updated_at,
    beatPage,
    setBeats,
    mp3,
    mp3_url,
    fire_id,
    fire_count,
    cold_id,
    cold_count,
    hard_id,
    hard_count,
    trash_id,
    trash_count,
    loop_id,
    loop_count,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const [averageRating, setAverageRating] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  /**
   * Fetches the average rating for the beat.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: ratingsData }] = await Promise.all([
          axiosReq.get(`/rating/`),
        ]);

        const ratingsForBeat = ratingsData.results.filter(
          (rating) => rating.beat === parseInt(id)
        );
        const totalRatings = ratingsForBeat.reduce(
          (acc, rating) => acc + rating.rating,
          0
        );
        const averageRating = ratingsForBeat.length
          ? totalRatings / (ratingsForBeat.length * 10)
          : 0;

        setAverageRating(averageRating);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchData();
    }, [id]);

    return () => clearTimeout(timer);
  }, [id]);

  /**
   * Redirects the user to the Edit page for the beat.
   */
  const handleEdit = () => {
    history.push(`/beats/${id}/edit`);
  };

  /**
   * Deletes the beat.
   * come back here and redirect to homepage
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/beats/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  // Fire Feedback Button
  const handleFireFeedbackLike = async () => {
    try {
      const { data } = await axiosReq.post("/feedback/fire/", { beat: id });
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === id
            ? { ...beatItem, fire_count: beatItem.fire_count + 1, fire_id: data.id }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error submitting FIRE feedback:", err);
    }
  };

  /**
   * Undoes the user's fire feedback on the beat.
   */
  const handleFireFeedbackUnlike = async () => {
    try {
      await axiosRes.delete(`/feedback/fire/${fire_id}/`);
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === id
            ? { ...beatItem, fire_count: beatItem.fire_count - 1, fire_id: null }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error undoing FIRE feedback:", err);
    }
  };


  // Cold Feedback Button
  const handleColdFeedbackLike = async () => {
    try {
      const { data } = await axiosReq.post("/feedback/cold/", { beat: id });
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === id
            ? { ...beatItem, cold_count: beatItem.cold_count + 1, cold_id: data.id }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error submitting cold feedback:", err);
    }
  };

  /**
   * Undoes the user's cold feedback on the beat.
   */
  const handleColdFeedbackUnlike = async () => {
    try {
      await axiosRes.delete(`/feedback/cold/${cold_id}/`);
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === id
            ? { ...beatItem, cold_count: beatItem.cold_count - 1, cold_id: null }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error undoing cold feedback:", err);
    }
  };

  // Hard Feedback Button
  const handleHardFeedbackLike = async () => {
    try {
      const { data } = await axiosReq.post("/feedback/hard/", { beat: id });
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === id
            ? { ...beatItem, hard_count: beatItem.hard_count + 1, hard_id: data.id }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error submitting HARD feedback:", err);
    }
  };

  /**
   * Undoes the user's hard feedback on the beat.
   */
  const handleHardFeedbackUnlike = async () => {
    try {
      await axiosRes.delete(`/feedback/hard/${hard_id}/`);
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === id
            ? { ...beatItem, hard_count: beatItem.hard_count - 1, hard_id: null }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error undoing HARD feedback:", err);
    }
  };

  // Trash Feedback Button
  const handleTrashFeedbackLike = async () => {
    try {
      const { data } = await axiosReq.post("/feedback/trash/", { beat: id });
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === id
            ? { ...beatItem, trash_count: beatItem.trash_count + 1, trash_id: data.id }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error submitting TRASH feedback:", err);
    }
  };

  /**
   * Undoes the user's trash feedback on the beat.
   */
  const handleTrashFeedbackUnlike = async () => {
    try {
      await axiosRes.delete(`/feedback/trash/${trash_id}/`);
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === id
            ? { ...beatItem, trash_count: beatItem.trash_count - 1, trash_id: null }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error undoing TRASH feedback:", err);
    }
  };

  // Loop Feedback Button
  const handleLoopFeedbackLike = async () => {
    try {
      const { data } = await axiosReq.post("/feedback/loop/", { beat: id });
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === id
            ? { ...beatItem, loop_count: beatItem.loop_count + 1, loop_id: data.id }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error submitting LOOP feedback:", err);
    }
  };

  /**
   * Undoes the user's loop feedback on the beat.
   */
  const handleLoopFeedbackUnlike = async () => {
    try {
      await axiosRes.delete(`/feedback/loop/${loop_id}/`);
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beatItem) =>
          beatItem.id === id
            ? { ...beatItem, loop_count: beatItem.loop_count - 1, loop_id: null }
            : beatItem
        ),
      }));
    } catch (err) {
      console.log("Error undoing LOOP feedback:", err);
    }
  };

  /**
   * Handles the like action on the beat.
   */
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { beat: id });
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beat) =>
          beat.id === id
            ? { ...beat, likes_count: beat.likes_count + 1, like_id: data.id }
            : beat
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handles the unlike action on the beat.
   */
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setBeats((prevBeats) => ({
        ...prevBeats,
        results: prevBeats.results.map((beat) =>
          beat.id === id
            ? { ...beat, likes_count: beat.likes_count - 1, like_id: null }
            : beat
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Component for the Fire Feedback button.
   */
  const FireFeedbackButton = ({ className, beat, fire_id, fire_count }) => {
    return (
      <div className={styles.FireFeedbackButton}>
        {fire_id ? (
          <span onClick={handleFireFeedbackUnlike}>
            <i className={`fas fa-fire ${feedbackStyles.fireIcon}`} />
          </span>
        ) : (
          <span onClick={handleFireFeedbackLike}>
            <i className={`fas fa-fire ${feedbackStyles.fireIcon}`} />
          </span>
        )}
        <span>{fire_count}</span>
      </div>
    );
  };

  /**
   * Component for the Cold Feedback button.
   */
  const ColdFeedbackButton = ({ className, beat, cold_id, cold_count }) => {
    return (
      <div className={styles.ColdFeedbackButton}>
        {cold_id ? (
          <span onClick={handleColdFeedbackUnlike}>
            <i className={`far fa-snowflake ${feedbackStyles.coldIcon}`} />
          </span>
        ) : (
          <span onClick={handleColdFeedbackLike}>
            <i className={`far fa-snowflake ${feedbackStyles.coldIcon}`} />
          </span>
        )}
        <span>{cold_count}</span>
      </div>
    );
  };

  /**
   * Component for the Hard Feedback button.
   */
  const HardFeedbackButton = ({ className, beat, hard_id, hard_count }) => {
    return (
      <div className={styles.HardFeedbackButton}>
        {hard_id ? (
          <span onClick={handleHardFeedbackUnlike}>
            <i className={`fas fa-gavel ${feedbackStyles.hardIcon}`} />
          </span>
        ) : (
          <span onClick={handleHardFeedbackLike}>
            <i className={`fas fa-gavel ${feedbackStyles.hardIcon}`} />
          </span>
        )}
        <span>{hard_count}</span>
      </div>
    );
  };

  /**
   * Component for the Trash Feedback button.
   */
  const TrashFeedbackButton = ({ className, beat, trash_id, trash_count }) => {
    return (
      <div className={styles.TrashFeedbackButton}>
        {trash_id ? (
          <span onClick={handleTrashFeedbackUnlike}>
            <i className={`fas fa-trash ${feedbackStyles.trashIcon}`} />
          </span>
        ) : (
          <span onClick={handleTrashFeedbackLike}>
            <i className={`fas fa-trash ${feedbackStyles.trashIcon}`} />
          </span>
        )}
        <span>{trash_count}</span>
      </div>
    );
  };

  /**
   * Component for the Loop Feedback button.
   */
  const LoopFeedbackButton = ({ className, beat, loop_id, loop_count }) => {
    return (
      <div className={styles.LoopFeedbackButton}>
        {loop_id ? (
          <span onClick={handleLoopFeedbackUnlike}>
            <i className={`fas fa-redo ${feedbackStyles.loopIcon}`} />
          </span>
        ) : (
          <span onClick={handleLoopFeedbackLike}>
            <i className={`fas fa-redo ${feedbackStyles.loopIcon}`} />
          </span>
        )}
        <span>{loop_count}</span>
      </div>
    );
  };

  return (
    <Card className={styles.Beat}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && beatPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/beats/${id}`}>
        <Card.Img src={musicImage} alt={title} />
        {mp3 && (
          <audio controls className={styles.Audio}>
            <source src={mp3_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </Link>

      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.beatBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own beat!</Tooltip>}
            >
              <i className={`far fa-heart ${styles.Heart}`} />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`far fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.Heart}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like beats!</Tooltip>}
            >
              <i className={`far fa-heart ${styles.Heart}`} />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/beats/${id}`}>
            <i className={`far fa-comments ${styles.Comment}`} />
          </Link>
          {comments_count}
        </div>

        <span className="float-right star.Star">
          {hasLoaded ? (
            <>
              <Rating
                className={star.Star}
                readonly
                initialValue={averageRating.toFixed(1)}
                size={25}
                fillColor="#yellow"
              />
              {averageRating.toFixed(1)}
            </>
          ) : (
            "Loading rating..."
          )}
        </span>

        <span className={feedbackStyles.FeedbackButtons}>
          <span className={feedbackStyles.fireIconContainer}>
            <FireFeedbackButton
              className={feedbackStyles.fireIcon}
              beat={id}
              fire_id={fire_id}
              fire_count={fire_count}
            />
            <span className={feedbackStyles.fireIconText}>
              This beat is FIRE
            </span>
          </span>

          <span className={feedbackStyles.hardIconContainer}>
            <HardFeedbackButton
              className={feedbackStyles.hardIcon}
              beat={id}
              hard_id={hard_id}
              hard_count={hard_count}
            />
            <span className={feedbackStyles.hardIconText}>
              This beat is HARD
            </span>
          </span>

          <span className={feedbackStyles.trashIconContainer}>
            <TrashFeedbackButton
              className={feedbackStyles.trashIcon}
              beat={id}
              trash_id={trash_id}
              trash_count={trash_count}
            />
            <span className={feedbackStyles.trashIconText}>
              This beat is TRASH
            </span>
          </span>

          <span className={feedbackStyles.coldIconContainer}>
            <ColdFeedbackButton
              className={feedbackStyles.coldIcon}
              beat={id}
              cold_id={cold_id}
              cold_count={cold_count}
            />
            <span className={feedbackStyles.coldIconText}>
              This beat is COLD
            </span>
          </span>

          <span className={feedbackStyles.loopIconContainer}>
            <LoopFeedbackButton
              className={feedbackStyles.loopIcon}
              beat={id}
              loop_id={loop_id}
              loop_count={loop_count}
            />
            <span className={feedbackStyles.loopIconText}>
              play that AGAIN
            </span>
          </span>
        </span>
      </Card.Body>
    </Card>
  );
};

export default Beat;

