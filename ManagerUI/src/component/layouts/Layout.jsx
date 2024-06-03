import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";


function Layout() {
  return ( 

    <>

        <Container fluid>
            <Row>
                <Col xs={2} md={2} lg={2} xl={2} className="position-fixed bg-light" style={{height: '100vh'}}>
                    <h1>Header</h1>
                </Col>
                <Col xs={{ span: 10, offset: 2 }} md={{ span: 10, offset: 2 }} lg={{ span: 10, offset: 2 }} xl={{ span: 10, offset: 2 }}>
                <h1>Content</h1>
                {/* Your content here */}
                
                </Col>
            </Row>
            </Container>

    </>     
  );
}

export default Layout;