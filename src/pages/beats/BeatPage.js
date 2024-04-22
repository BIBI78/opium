import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Beat from "./Beat";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import BeatRatingForm from "./BeatRatingForm";
import PopularProfiles from "../profiles/PopularProfiles";

/**
 * Component for displaying a single beat page.
 * 
 * Renders beat details, comments, and comment creation form.
 * Fetches beat data and comments from the server on mount.
 * Allows logged-in users to rate the beat and leave comments.
 */
function BeatPage() {
  // Get beat ID from route params
  const { id } = useParams();

  // State variables for beat, comments, and average rating
  const [beat, setBeat] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const [averageRating, setAverageRating] = useState(0);

  // Get current user from context
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const owner = beat.results[0]?.owner;

  // Fetch beat and comments data on component mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Fetch beat and comments data
        const [{ data: beat }, { data: comments }] = await Promise.all([
          axiosReq.get(`/beats/${id}/`),
          axiosReq.get(`/comments/?beat=${id}`),
        ]);
        setBeat({ results: [beat] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  /**
  * Function to update average rating of the beat
    */
  
  const updateAverageRating = (newRating) => {
    const totalRatings = averageRating * beat.results[0].ratings_count;
    const newAverageRating =
      (totalRatings + newRating.rating) / beat.results[0].ratings_count;
    setAverageRating(newAverageRating);
  };

  // JSX for rendering the component
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Render popular producers section */}
        <p>popular producers</p>
        {/* Render beat details */}
        <Beat {...beat.results[0]} setBeats={setBeat} beatPage />
        {/* Render comment creation form and beat rating form if user is logged in */}
        <Container className={appStyles.Content}>
          {currentUser ? (
            <>
              {/* Comment creation form */}
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                beat={id}
                setBeat={setBeat}
                averageRating={averageRating.toFixed(2)}
                setComments={setComments}
              />
              <Container className={`mb-3 ${appStyles.Content}`}>
                {/* Beat rating form */}
                {currentUser && currentUser.profile_id ? (
                  <BeatRatingForm
                    profile_id={currentUser.profile_id}
                    beat={id}
                    id={id}
                    owner={owner}
                    setBeat={setBeat}
                    currentUser={currentUser}
                    averageRating={averageRating.toFixed(2)}
                    updateAverageRating={updateAverageRating}
                  />
                ) : (
                  <div> login to rate the beat.</div>
                )}
              </Container>
            </>
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {/* Render comments with infinite scrolling */}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setBeat={setBeat}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments yet.</span>
          )}
        </Container>
      </Col>
      {/* Render popular profiles section on larger screens */}
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default BeatPage;
