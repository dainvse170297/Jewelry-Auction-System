import React from "react";
import "./footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer__about">
              <p>
                The customer is at the heart of our unique business model, which
                includes design.
              </p>
              <a href="#">
                <img src="img/payment.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
            <div className="footer__widget">
              <ul>
                <li>
                  <a href="#">Jewelry Auction</a>
                </li>
                <li>
                  <a href="#">Trending Jewelry</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="footer__widget">
              <ul>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="#">Payment Methods</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
            <div className="footer__widget">
              <ul>
                <li>
                  <a href="/delivery">Delivery</a>
                </li>
                <li>
                  <a href="#">Return &amp; Exchanges</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="footer__copyright__text">
              <p>Copyright &copy; {currentYear} All rights reserved | FUJA</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
