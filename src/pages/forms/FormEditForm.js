import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/FormCreateEditForm.module.css";

/**
 * Component for editing a form.
 * 
 * Allows users to modify the title and content of a form and save the changes.
 */
function FormEditForm(props) {
  const { id, title: initialTitle, content: initialContent, setShowEditForm, setForms } = props;

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

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
      await axiosRes.put(`/forms/${id}/`, {
        title: title.trim(),
        content: content.trim(),
      });
      // Update the forms list with the edited form
      setForms((prevForms) => ({
        ...prevForms,
        results: prevForms.results.map((form) => {
          return form.id === id
            ? {
              ...form,
              title: title.trim(),
              content: content.trim(),
            }
            : form;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        {/* Input field for editing the title */}
        <Form.Control
          className={styles.Title}
          type="text"
          value={title}
          onChange={handleChangeTitle}
          placeholder="Title"
        />
      </Form.Group>
      <Form.Group>
        {/* Input field for editing the content */}
        <Form.Control
          className={styles.Content}
          as="textarea"
          rows={3}
          value={content}
          onChange={handleChangeContent}
          placeholder="Content"
        />
      </Form.Group>
      <div className="text-right">
        {/* Button to cancel editing */}
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        {/* Button to save changes */}
        <button
          className={styles.Button}
          disabled={!title.trim() || !content.trim()} // Disable button if title or content is empty or only whitespace
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default FormEditForm;
