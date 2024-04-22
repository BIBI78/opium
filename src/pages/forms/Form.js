import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import FormEditForm from "./FormEditForm"; // Assuming you have a FormEditForm component for editing forms

import styles from "../../styles/Form.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

/**
 * Component for displaying a single form.
 * 
 * Renders form details including title, content, and owner information.
 * Provides options for editing and deleting the form if the current user is the owner.
 */
const Form = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    title,
    content,
    id,
    setForms,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // Function to handle form deletion
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/forms/${id}/`);
      // Remove the deleted form from the forms list
      setForms((prevForms) => ({
        ...prevForms,
        results: prevForms.results.filter((form) => form.id !== id),
      }));
    } catch (err) {
      console.error("Error deleting form:", err);
    }
  };

  return (
    <>
      <hr />
      <Media>
        {/* Link to the profile of the form owner */}
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {/* Render the edit form if showEditForm is true, otherwise render form details */}
          {showEditForm ? (
            <FormEditForm // This is your edit form component
              id={id}
              title={title}
              content={content}
              profileId={profile_id}
              profileImage={profile_image}
              setForms={setForms}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <>
              <h5>{title}</h5>
              <p>{content}</p>
            </>
          )}
        </Media.Body>
        {/* Render more dropdown for the form owner */}
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)} // Show edit form when clicked
            handleDelete={handleDelete} // Delete form when clicked
          />
        )}
      </Media>
    </>
  );
};

export default Form;
