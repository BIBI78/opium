import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Beat from "./Beat";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/BeatsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

/**
 * Component for displaying a page with a list of beats.
 * 
 * Renders a search bar and a list of beats.
 * Fetches beats from the server based on search query and filter.
 * Supports infinite scroll for loading more beats.
 */
function BeatsPage({ message, filter = "" }) {
  // State variables for storing beats, loading state, and search query
  const [beats, setBeats] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  // Effect hook to fetch beats based on search query and filter
  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const { data } = await axiosReq.get(`/beats/?${filter}search=${query}`);
        setBeats(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchBeats();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search beats"
          />
        </Form>
        {hasLoaded ? (
          <>
            {beats.results.length ? (
              <InfiniteScroll
                children={beats.results.map((beat) => (
                  <Beat key={beat.id} {...beat} setBeats={setBeats} />
                ))}
                dataLength={beats.results.length}
                loader={<Asset spinner />}
                hasMore={!!beats.next}
                next={() => fetchMoreData(beats, setBeats)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default BeatsPage;
