import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/FormCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

/**
 * Component for creating a new form.
 * 
 * Allows users to input a title and content for the form and submit it.
 */
function FormCreateForm(props) {
  const { setForms, profileImage, profile_id } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Function to handle changes in the title input field
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  // Function to handle changes in the content input field
  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/forms/", {
        title,
        content,
      });
      // Update the forms list with the newly created form
      setForms((prevForms) => ({
        ...prevForms,
        results: [data, ...prevForms.results],
      }));
      // Clear the title and content input fields
      setTitle("");
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          {/* Link to the profile of the form owner */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          {/* Input field for entering the title */}
          <Form.Control
            className={styles.Title}
            placeholder="Title"
            value={title}
            onChange={handleChangeTitle}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        {/* Input field for entering the content */}
        <Form.Control
          className={styles.Content}
          placeholder="Content"
          as="textarea"
          rows={3}
          value={content}
          onChange={handleChangeContent}
        />
      </Form.Group>
      {/* Button to submit the form */}
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!title.trim() || !content.trim()} // Disable button if title or content is empty or only whitespace
        type="submit"
      >
        Post
      </button>
    </Form>
  );
}

export default FormCreateForm;
