import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

/**
 * Component for creating comments.
 * 
 * Allows users to input comment content and submit comments.
 */
function CommentCreateForm(props) {
  const { beat, setBeat, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  // Function to handle content change in the comment input field
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Function to handle comment submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        beat,
      });
      // Update comments list with the newly created comment
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      // Update beat comments count
      setBeat((prevBeat) => ({
        results: [
          {
            ...prevBeat.results[0],
            comments_count: prevBeat.results[0].comments_count + 1,
          },
        ],
      }));
      // Clear the comment content input field
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          {/* Render user avatar linking to their profile */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          {/* Input field for entering comment content */}
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      {/* Button to submit the comment */}
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()} // Disable button if content is empty or only whitespace
        type="submit"
      >
        comment
      </button>
    </Form>
  );
}

export default CommentCreateForm;
