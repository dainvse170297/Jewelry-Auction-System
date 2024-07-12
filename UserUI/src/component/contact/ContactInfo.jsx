import React from "react";
import "./contactInfo.scss";
import Button from "react-bootstrap/Button";

const ContactInfo = () => {
  return (
    <div className="contact-info container py-5">
      <div className="text-center mb-4 ">
        <h1>Contact Us</h1>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="content-section">
            <h5 className="card-title">About FUJA®</h5>
            <p>
              Headquartered on Fifth Avenue in New York City, FUJA is the
              leading boutique fine jewelry and watch auction house. FUJA
              provides a secure, transparent, trusted, and regulated global
              auction marketplace to buy and sell fine jewelry, gemstones, and
              watches to clients in more than 100 countries.
            </p>
            <div className="row">
              <div className="col-md-9 offset-md-1">
                <img
                  src="https://www.philophrosyne.com/cdn/shop/articles/Jewelry-Auctions-What-You-Need-to-Know_1024x1024.jpg?v=1689680322"
                  alt="FUJA Auction"
                  className="img-fluid"
                />
                <p className="img-caption"></p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h5 className="card-title">For our consignors / sellers</h5>
            <p>
              FUJA provides a means to maximize the value achieved for their
              jewelry and watches by reaching and encouraging competition among
              bidders in many countries, without the upfront risk (in the form
              of enormous fixed fees) that they might otherwise have to shoulder
              when working with one of the “big houses”, and with white glove
              client service that is unparalleled in the industry and made
              available to all of our clients—not just a select few.
            </p>
            <div className="row">
              <div className="col-md-9 offset-md-1 content-section-button">
                <Button
                  className="btn-red content-section-button"
                  href="/selling"
                >
                  About Selling At Auction
                </Button>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h5 className="card-title">For our bidders / buyers</h5>
            <p>
              FUJA provides a means to maximize the value achieved for their
              jewelry and watches by reaching and encouraging competition among
              bidders in many countries, without the upfront risk (in the form
              of enormous fixed fees) that they might otherwise have to shoulder
              when working with one of the “big houses”, and with white glove
              client service that is unparalleled in the industry and made
              available to all of our clients—not just a select few.
            </p>
            <div className="row">
              <div className="col-md-9 offset-md-1 content-section-button">
                <Button className="btn-red" href="/create-valuation">
                  About Valuation Request
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="content-section">
            <h5 className="card-title">CONTACT INFO</h5>
            <div className="info-section">
              <p>
                <strong>Address:</strong>
                <br />
                Lot E2a-7, Street D1, D. D1
                <br />
                Long Thanh My, Thu Duc City
                <br />
                Ho Chi Minh 700000
              </p>
            </div>
            <div className="info-section">
              <p>
                <strong>Hours:</strong>
                <br />
                Mon-Fri 10am-6pm EST
                <br />
                <em>Office Visits by Appointment Only</em>
              </p>
            </div>
            <div className="info-section">
              <p>
                <strong>Phone:</strong>
                <br />
                0348012834
              </p>
            </div>
            <div className="info-section">
              <p>
                <strong>Youtube:</strong>
                <br />
                FUJA
              </p>
            </div>
            <div className="info-section">
              <p>
                <strong>Email:</strong>
                <br />
                <a href="mailto:jewelryauctionsystem06@gmail.com">
                  jewelryauctionsystem06@gmail.com
                </a>
              </p>
            </div>
            <div className="info-section">
              <p>
                <strong>Languages:</strong>
                <br />
                English
                <br />
                Japanese
                <br />
                Vietnamese
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
