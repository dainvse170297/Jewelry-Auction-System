import { Carousel, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LotPreview = ({ lot, registeredValue, sessionStatus }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Carousel>
        {lot &&
          lot.productImages &&
          lot.productImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image.imageUrl}
                alt={`Slide ${index}`}
              />
            </Carousel.Item>
          ))}
      </Carousel>
      <Card.Body>
        <Card.Title>{lot.productName}</Card.Title>
        <Card.Text>
          <p>
            EST. {lot.estimatePriceMin} - {lot.estimatePriceMax}
          </p>
          {sessionStatus === "UPCOMING" && (
            <Button variant="primary">Register to Bid</Button>
          )}
          {sessionStatus === "LIVE" && (
            <Button variant="primary">Place Bid</Button>
          )}
          <p>Current Price: {lot.currentPrice}</p>

          {/* {registeredValue && <p>Registered Value: {registeredValue}</p>}
          <Link to={`/upcoming-session-lot/${lot.id}`}>
            <button className="detail-button">View details</button>
          </Link> */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LotPreview;
