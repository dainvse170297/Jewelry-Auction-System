import { Carousel, Card } from "react-bootstrap";

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
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LotPreview;
