// ReviewForm.jsx
import { createSignal } from "solid-js";
import { Form, Button } from "solid-bootstrap";

function ReviewForm({ fetchReviews }) {
  const [clicked, setClicked] = createSignal(false);
  const [stars, setStars] = createSignal(0);
  const [hoveredStars, setHoveredStars] = createSignal(0);
  const [name, setName] = createSignal("");
  const [review, setReview] = createSignal("");

  const onMouseOver = (rating) => {
    if (clicked()) return;
    setHoveredStars(rating);
  };

  const onMouseOut = () => {
    if (clicked()) return;
    setHoveredStars(0);
  };

  const onClick = (rating) => {
    setClicked(!clicked());
    setStars(rating);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const reviewData = {
      data: {
        reviewers_name: name(),
        reviewers_rating: stars(),
        the_review: review(),
      },
    };

    try {
      const response = await fetch(
        "http://localhost:1337/api/customer-reviews/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        console.error("Response status:", response.status);
        console.error("Response text:", await response.text());
        throw new Error("Failed to submit review");
      }

      // Re-fetch reviews to include the new submission
      fetchReviews();

      // Reset form
      setName("");
      setReview("");
      setStars(0);
      setHoveredStars(0);
      setClicked(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="form-container">
      <Form onSubmit={submitReview}>
        <Form.Group className="star-rating">
          <Form.Label>Your Rating:</Form.Label>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`star ${
                i < (hoveredStars() || stars()) ? "selected" : ""
              }`}
              onMouseOver={() => onMouseOver(i + 1)}
              onMouseOut={onMouseOut}
              onClick={() => onClick(i + 1)}
            >
              &#9733;
            </span>
          ))}
        </Form.Group>
        <div className="input-group">
          <Form.Label for="name">Name:</Form.Label>
          <Form.Control
            id="name"
            type="text"
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
            className="form-input"
          />
        </div>
        <div className="input-group">
          <Form.Label for="review">Review:</Form.Label>
          <Form.Control
            id="review"
            as="textarea"
            rows={3}
            value={review()}
            onInput={(e) => setReview(e.currentTarget.value)}
            className="form-input"
          />
        </div>
        <Button variant="success" type="submit" disabled={review() === ""}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ReviewForm;
