import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import musicImage from "../../assets/music.jpg";
import { Image } from "react-bootstrap";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

/**
 * Component for editing a beat.
 * 
 * Renders a form to edit beat details, including title, content, and MP3 file.
 * Fetches the beat data from the server on mount and updates the form accordingly.
 * Handles form submission to update the beat data.
 */
function BeatEditForm() {
  // State for form data and errors
  const [errors, setErrors] = useState({});
  const [beatData, setBeatData] = useState({
    title: "",
    content: "",
    mp3: "",
  });

  // Destructuring form data
  const { title, content, mp3 } = beatData;

  // State to track if new MP3 file is added
  const [newMp3Added, setNewMp3Added] = useState(false);

  // Ref for file input
  const mp3Input = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  // Fetch beat data on component mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/beats/${id}/`);
        const { title, content, mp3, is_owner } = data;

        // Redirect if user is not the owner of the beat
        is_owner ? setBeatData({ title, content, mp3 }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  // Handle form input change
  const handleChange = (event) => {
    setBeatData({
      ...beatData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle MP3 file change
  const handleChangeMp3 = (event) => {
    if (event.target.files.length) {
      setBeatData({
        ...beatData,
        mp3: event.target.files[0],
      });
      setNewMp3Added(true);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    if (newMp3Added) {
      formData.append("mp3", mp3);
    }

    try {
      await axiosReq.patch(`/beats/${id}/`, formData);
      history.push(`/beats/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // JSX for text fields and buttons
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  // Render the form
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Image className={`${appStyles.musicImage} ${appStyles.smallImage}`} src={musicImage} rounded />
            <Form.Group className="text-center">
              {mp3 ? (
                <>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="mp3-upload"
                    >
                      Change the MP3 file
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="mp3-upload"
                >
                </Form.Label>
              )}
              <Form.File
                id="mp3-upload"
                accept=".mp3"
                onChange={handleChangeMp3}
                ref={mp3Input}
              />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default BeatEditForm;
