import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhotoReviewModal from "../valuation_request/create/PhotoReviewModal";
import "./CreateFinancialProofRequest.scss";
import FullScreenImage from "../../image/FullScreenImage.jsx";
import { postCreateFinancialProofAmount } from "../../services/apiService.jsx";

const customImage =
  "https://cache.net-a-porter.com/content/images/story-head-content-15thAugust2022-1660549922781.jpeg/w1900_q65.jpeg";
const imageStyle = {
  width: "100%",
  height: "auto",
  maxWidth: "480px",
  margin: "0 auto",
  borderRadius: "10px",
};
export default function CreateFinancialProofRequest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState({
    emptyDescription: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("account"));

  const [valuation, setValuation] = useState({
    memberId: currentUser.memberId,
    photos: [],
  });

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  const handleImagesUpload = (images) => {
    setValuation({ ...valuation, photos: images });
    const imageUrls = images.map((file) => URL.createObjectURL(file));
    setSelectedImages(imageUrls);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValuation({ ...valuation, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setEmptyMessage({ ...emptyMessage, [name]: "This field is required" });
      toast.error("This field is required");
    }
  };

  async function createFinancialProof(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const createValuation = await postCreateFinancialProofAmount(valuation);
      if (createValuation) {
        toast.success("Financial proof request successfully submitted!");
        setValuation({
          memberId: currentUser.memberId,
          description: "",
          memberEstimate: "",
          photos: [],
        });
        setSelectedImages([]);

        setTimeout(() => {
          window.location.reload(); // Reload page to remove modal
        }, 1000);
      } else {
        toast.error("Error submitting financial proof request..");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting financial proof request....");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center mb-4" style={{ color: "#B23842" }}>
        Create Financial Proof Request
      </h1>
      <div className="shadow">
        <div className="card-body p-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 mb-4">
              <h5 className="card-title text-center policy-title my-3">
                Policy About Financial Proof For Member
              </h5>

              <p className="policy-text">
                By clicking the button, you agree to our Terms of Service and
                Privacy Statement.
              </p>
              <p className="policy-text">
                Upload Proof of Funds. To participate in an auction,
                participants must provide and upload file proof. Liquid funds
                must be available immediately without restriction. Proof of
                funds must demonstrate your ability to bid up to your requested
                limit. The acceptance of proof of funds documents is made at the
                sole and absolute discretion of <strong>FUJA</strong>. Please
                note, proof of funds may be accepted from a partner(s) or in an
                entity's name if the proper authorizations are provided.
              </p>
              <div className="text-center mt-4">
                <img
                  src={customImage}
                  alt="Custom Icon"
                  className="policy-icon"
                  style={imageStyle}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-8 mb-4">
              <div className="text-center">
                <p className="h5">Photos</p>
                <hr />
                <PhotoReviewModal onOk={handleImagesUpload} />

                <p className="pt-2 text-muted">JPEG, PNG, PDF</p>
              </div>
              <div className="text-center">
                <form onSubmit={createFinancialProof}>
                  {selectedImages.length > 0 && (
                    <Button
                      type="submit"
                      variant="danger"
                      disabled={loading}
                      className="mt-3"
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Loading...</span>
                        </>
                      ) : (
                        "Send Financial Proof Request"
                      )}
                    </Button>
                  )}
                </form>
              </div>

              <div className="mt-5 mb-5 ">
                <p className="policy-text px-4 extra-margin">
                  All submitted documents will be reviewed for authenticity and
                  relevance. If any discrepancies are found, the request may be
                  denied. It's essential to ensure that all documents are clear
                  and legible.
                </p>
                <p className="policy-text px-4">
                  If you have any questions or need further assistance, please
                  don't hesitate to reach out to us. We are always here to
                  assist you with any inquiries or requests. Feel free to
                  contact us for timely support!
                </p>
                <div className="text-center">
                  <Button
                    variant="danger"
                    className="px-4 py-2" // Increased padding
                    onClick={() => navigate("/contact")}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
