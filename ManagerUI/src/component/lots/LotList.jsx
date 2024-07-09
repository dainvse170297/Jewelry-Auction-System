import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";
import { getReadyLots } from "../../services/apiService";

const ReadyLots = () => {
  const [readyLots, setReadyLots] = useState([]);

  useEffect(() => {
    const fetchReadyLots = async () => {
      try {
        const response = await getReadyLots();
        setReadyLots(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReadyLots();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="ms-5 me-5">
          <h2 className="text-center mt-2">Ready Lots</h2>
          <div className="row">
            {readyLots.map((lot, index) => (
              <Col md={3} sm={4} key={index}>

                <div className="card mt-3" key={index}>
                  <div className="card-body">
                    <img
                      src={lot.productImages[0].imageUrl}
                      alt={lot.productName + " photo"}
                    />
                    <h6 className="card-title text">
                      <strong>{truncateText(lot.productName, 35)}</strong>
                    </h6>
                    <p className="card-subtitle mb-2 text-muted text">
                      <em>{truncateText(lot.description, 35)}</em>
                    </p>
                    <p className="card-text">
                      Estimate Max Price:{" "}
                      <strong>{lot.estimatePriceMax}</strong>
                    </p>
                    <p className="card-text">
                      Estimate Min Price:{" "}
                      <strong>{lot.estimatePriceMin}</strong>
                    </p>
                    <div className="text-center">
                      <button className="link-btn">
                        <Link to={`/add-session/${lot.id}`}>
                          Add to Session
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>

              </Col>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ReadyLots };
