import { Carousel, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LotPreview = ({ lot, registeredValue }) => {
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
          <p>Id: {lot.id}</p>
          <p>Product Id: {lot.productId}</p>
          <p>Current Price: {lot.currentPrice}</p>
          {registeredValue && <p>Registered Value: {registeredValue}</p>}

          {lot.status === "READY" && (
            <div className=" d-flex justify-content-center">
              <Link to={`/live-lot-detail/${lot.id}`}>
                {" "}
                <Button> Place Bid </Button>
              </Link>
            </div>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LotPreview;
