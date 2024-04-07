import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
// eslint-disable-next-line
import UploadMusicImage from "../../assets/newmusictrans.png";

import musicImage from "../../assets/music.jpg";
import { Image } from "react-bootstrap";
// eslint-disable-next-line
import Asset from "../../components/Asset";

// import Image from "react-bootstrap/Image";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
// eslint-disable-next-line
import Beat from "./Beat";




function BeatEditForm() {
  const [errors, setErrors] = useState({});

  const [beatData, setBeatData] = useState({
    title: "",
    content: "",
    mp3: "",
  });

  const { title, content, mp3 } = beatData;

 const mp3Input = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/beats/${id}/`);
        const { title, content, mp3, is_owner } = data;

        is_owner ? setBeatData({ title, content, mp3 }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setBeatData({
      ...beatData,
      [event.target.name]: event.target.value,
    });
  };

 
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

   

    try {
      await axiosReq.put(`/beats/${id}/`, formData);
      history.push(`/beats/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
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
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
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
                    {/* <Asset
                    className={` ${appStyles.smallImage}`}
                    src={UploadMusicImage} 
                    message="Click or tap to upload an MP3 file"
                    
                    /> */}
                    
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