// App.jsx
import { createSignal, createEffect } from "solid-js";
import { Container, Col, Row } from "solid-bootstrap";
import ReviewCard from "./components/ReviewCard";
import ReviewForm from "./components/ReviewForm"; // Import the ReviewForm component
import "./index.css";

function App() {
  const [reviews, setReviews] = createSignal([]);

  // Fetch reviews from Strapi backend
  const fetchReviews = () => {
    fetch("http://localhost:1337/api/customer-reviews/")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setReviews(data.data);
        } else {
          console.error("Expected an array of reviews, but received:", data);
          setReviews([]);
        }
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  };

  createEffect(() => {
    fetchReviews();
  });

  const deleteReview = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/customer-reviews/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      // Re-fetch reviews to reflect the deletion
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <>
      <Container fluid className="App text-light text-center">
        <Col md={{ span: 6, offset: 3 }}>
          <Row className="mt-5">
            <Col>
              <ReviewForm fetchReviews={fetchReviews} />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <div className="cards-container">
                {Array.isArray(reviews()) &&
                  reviews().map((r, rIndex) => (
                    <ReviewCard
                      key={rIndex}
                      review={r}
                      onDelete={deleteReview}
                    />
                  ))}
              </div>
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default App;
