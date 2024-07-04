import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>404 - Page Not Found</h1>
          <p>Oops! The page you are looking for does not exist.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
