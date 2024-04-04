 import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// import Upload from "../../assets/upload.png";
import UploadMusicImage from "../../assets/newmusictrans.png";

import styles from "../../styles/BeatCreateEditForm.module.css";
import appStyles from "../../App.module.css"; 
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import musicImage from "../../assets/music.jpg";

const BeatCreateForm = () => {
   // eslint-disable-next-line
  const [errors, setErrors] = useState({});
  console.log("form component rendered")

  const [beatData, setBeatData] = useState({
    title: "",
    content: "",
    mp3: "",
    image: "",
  });

  const mp3Input = useRef(null);
  // might not want to upload an image 
  // const imageInput = useRef(null);
  const history = useHistory();

// eslint-disable-next-line 
  const { title, content, mp3, image } = beatData;

  const handleChange = (event) => {
    setBeatData({
      ...beatData,
      [event.target.name]: event.target.value,
    });
  };

  // const handleChangeImage = (event) => {
  //   if (event.target.files.length) {
  //     URL.revokeObjectURL(image);
  //     setBeatData({
  //       ...beatData,
  //       image: URL.createObjectURL(event.target.files[0]),
  //     });
  //   }
  // };

  const handleChangeMp3 = (event) => {
    if (event.target.files.length) {
      setBeatData({
        ...beatData,
        mp3: event.target.files[0],
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("mp3", mp3);
    // formData.append("image", imageInput.current.files[0]);

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
        onClick={() => {}}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
           
            <Image className={`${appStyles.musicImage} ${appStyles.smallImage}`}  src={musicImage}  rounded />

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

export default BeatCreateForm;
        