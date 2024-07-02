import { Carousel, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LotPreview.scss";

const LotPreview = ({ lot, registeredValue, sessionStatus }) => {

  const truncate = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  }

  return (
    <Card style={{ width: "20rem" }}>
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
      <Card.Body className=" text-center ">
        <Card.Title>
          <strong>
            {truncate(lot.productName, 20)}
          </strong>
        </Card.Title>

        <Card.Text>
          <p className="est">
            EST. {lot.estimatePriceMin} <strong> $</strong> -{" "}
            {lot.estimatePriceMax}
            <strong> $</strong>
          </p>
          {sessionStatus === "UPCOMING" && (
            <Link to={`/upcoming-session-lot/${lot.id}`} className="a">
              <button className="mx-auto primary-btn">Register to Bid</button>
            </Link>
          )}
          {sessionStatus === "LIVE" && (
            <>
              {" "}
              <p>
                Current Price: {lot.currentPrice} <strong>$</strong>{" "}
              </p>
              <Link to={`/live-lot-detail/${lot.id}`} className="btn ">
                <button className="placebid ">Place Bid</button>
              </Link>
            </>
          )}

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
