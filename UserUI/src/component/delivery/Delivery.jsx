import React from "react";
import "./delivery.scss"; // Import the SCSS file created

const Delivery = () => {
  const imgIntroduce =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1720111650/6c4e7411-c64c-4195-a16c-a357a2d7991e_cnjo5w.jpg";
  const step1Img =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1720113445/happy-client-with-their-box-delivered_23-2149229255.jpg_nwfjxu.jpg";
  const step2Img =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1720113585/Box-Case-Labels_kjudur.png";
  const step3Img =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1720113730/1140-insurance_lmwipw.jpg";
  const step4Img =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1720113800/post-service-tracking-abstract-concept-vector-illustration-parcel-monitor-track-trace-your-shipment-package-tracking-number-express-delivery-online-shopping-mail-box-abstract-metaphor_335657-1777_ik10jt.jpg";

  return (
    <div className="container-fluid">
      <div className="col-md-10 offset-md-1 my-5">
        <div className="row mb-5">
          <div className="col-md-12 text-center">
            <h2 className="section-title">Delivery Instructions</h2>
            <p>
              Ensuring the safety of your valuable items during transit is of
              utmost importance. Here is a comprehensive guide to help you
              package and insure your items effectively.
            </p>
          </div>
        </div>

        <div className="row mb-5 step-section">
          <div className="col-md-6 mb-4">
            <h3 className="text-center step-title">Step 1: Secure Packaging</h3>
            <img src={step1Img} alt="Step 1" className="img-fluid step-image" />
            <p>
              Use high-quality materials such as bubble wrap, packing peanuts,
              and sturdy boxes to securely package your items. Ensure there is
              no movement inside the box once sealed.
            </p>
            <p>
              Start by wrapping each item individually with bubble wrap,
              ensuring all sides are covered. Place packing peanuts or foam at
              the bottom of the box, place the wrapped items inside, and fill
              any remaining space with more packing peanuts to prevent movement.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <h3 className="text-center step-title">Step 2: Proper Labeling</h3>
            <img src={step2Img} alt="Step 2" className="img-fluid step-image" />
            <p>
              Clearly label your package with the recipient's address and your
              return address. Include any special handling instructions to
              ensure careful handling.
            </p>
            <p>
              Use a permanent marker or printed labels to ensure the information
              is legible and will not smudge or fade. For added protection,
              place a copy of the address and handling instructions inside the
              package.
            </p>
          </div>
        </div>

        <div className="row mb-5 step-section">
          <div className="col-md-6 mb-4">
            <h3 className="text-center step-title">
              Step 3: Choosing the Right Insurance
            </h3>
            <img src={step3Img} alt="Step 3" className="img-fluid step-image" />
            <p>
              Choose a reliable insurance provider to cover the full value of
              your items during transit. This provides peace of mind and
              financial protection in case of loss or damage.
            </p>
            <p>
              Contact your shipping carrier to discuss insurance options. Ensure
              the coverage matches the value of your items and keep a copy of
              the insurance documentation for your records.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <h3 className="text-center step-title">
              Step 4: Tracking and Confirmation
            </h3>
            <img src={step4Img} alt="Step 4" className="img-fluid step-image" />
            <p>
              Use a shipping service that offers tracking and delivery
              confirmation. This allows you to monitor the progress of your
              package and confirm its safe arrival.
            </p>
            <p>
              Request a tracking number and regularly check the shipping status
              online. Upon delivery, verify that the recipient has received the
              package in good condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
