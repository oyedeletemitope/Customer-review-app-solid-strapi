// Card.jsx
import { createSignal } from "solid-js";
import { Card, Button } from "solid-bootstrap";

function ReviewCard({ review, onDelete }) {
  return (
    <Card className="card">
      <Card.Body>
        <p>{review.attributes.reviewers_name}</p>
        {[...Array(review.attributes.reviewers_rating)].map((_, index) => (
          <span key={index} className="text-warning">
            &#9733;
          </span>
        ))}
        <p>{review.attributes.the_review}</p>
        <Button variant="danger" onClick={() => onDelete(review.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ReviewCard;
