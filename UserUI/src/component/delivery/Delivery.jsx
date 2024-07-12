import React from "react";
import "./delivery.scss"; // Import the SCSS file created

const Delivery = () => {
  const imgIntroduce =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1720111650/6c4e7411-c64c-4195-a16c-a357a2d7991e_cnjo5w.jpg";
  const step1Img =
    "https://bangkeobaochau.com/image/catalog/t2/Bang-keo-bao-chau-t2-27.jpg";
  const step2Img =
    "https://media.licdn.com/dms/image/C4D12AQHOCpH6FlTIOg/article-cover_image-shrink_600_2000/0/1623997377411?e=2147483647&v=beta&t=2XE-5wKANtLQZ23wccxwhoVBLuPBCeZdBQ7dA__6CP4";
  const step3Img =
    "https://static.vecteezy.com/system/resources/previews/015/360/477/original/freight-cargo-delivery-insurance-concept-parcel-package-transportation-protection-coverage-guarantee-policy-cardboard-boxes-with-logistics-courier-safe-service-shipping-risk-management-eps-vector.jpg";
  const step4Img =
    "https://assets-global.website-files.com/642ef757a877301c1891551b/65b3bb5503a927738c9a5d8b_retail-delivery-service-scaled.webp";

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
            <img
              src={step2Img}
              alt="Step 2"
              className="img-fluid step-image mb-5"
            />
            <p className="mt-5">
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
            <img
              src={step4Img}
              alt="Step 4"
              className="img-fluid step-image mb-5"
            />

            <p className=" mt-5">
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
