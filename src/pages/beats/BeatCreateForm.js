import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Image } from "react-bootstrap";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import musicImage from "../../assets/music.jpg";
import UploadMusicImage from "../../assets/newmusictrans.png";
import Asset from "../../components/Asset";
import styles from "../../styles/BeatCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom";

const BeatCreateForm = () => {
  // State for form data and errors
  const [errors, setErrors] = useState({});
  const [beatData, setBeatData] = useState({
    title: "",
    content: "",
    mp3: "",
    image: "",
  });

  // Ref for file input
  const mp3Input = useRef(null);
  const history = useHistory();

  // Destructuring form data
  const { title, content, mp3 } = beatData;

  // Event handler for input changes
  const handleChange = (event) => {
    setBeatData({
      ...beatData,
      [event.target.name]: event.target.value,
    });
  };

  // Event handler for MP3 file selection
  const handleChangeMp3 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const audio = new Audio(e.target.result);
      audio.onloadedmetadata = function () {
        if (audio.duration > 30) {
          setErrors({ mp3: ["MP3 duration must be 30 seconds or less"] });
        } else {
          setErrors({});
          setBeatData({
            ...beatData,
            mp3: file,
          });
        }
      };
    };
    reader.readAsDataURL(file);
  };

  // Event handler for form submission
  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation: Check if title is provided
    if (!title.trim()) {
      setErrors({ title: ["Title is required"] });
      return; // Exit early if title is not provided
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("mp3", mp3);
    try {
      const { data } = await axios.post("/beats/", formData);
      history.push(`/beats/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        // Handle error response
      }
    }
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {/* Left column */}
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Image className={`${appStyles.musicImage} ${appStyles.smallImage}`} src={musicImage} rounded />
            {/* MP3 file upload */}
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
                  <Asset
                    className={` ${appStyles.smallImage}`}
                    src={UploadMusicImage}
                    message="Click or tap to upload an MP3 file"
                  />
                </Form.Label>
              )}
              {/* File input */}
              <Form.File
                id="mp3-upload"
                accept=".mp3"
                onChange={handleChangeMp3}
                ref={mp3Input}
              />
              {/* Error message for MP3 duration */}
              {errors?.mp3?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>
          </Container>
        </Col>
        {/* Right column */}
        <Col md={5} lg={4} className="p-0 p-md-2">
          <Container className={appStyles.Content}>
            <div className="text-center">
              {/* Title input */}
              <Form.Group>
                <Form.Label>Track title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Error message for title */}
              {errors?.title && (
                <Alert variant="warning">
                  {errors.title.map((message, idx) => (
                    <div key={idx}>{message}</div>
                  ))}
                </Alert>
              )}
              {/* Content input */}
              <Form.Group>
                <Form.Label>Info</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="content"
                  value={content}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Submit button */}
              <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                Create
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default BeatCreateForm;
