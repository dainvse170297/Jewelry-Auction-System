import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhotoReviewModal from "../valuation_request/create/PhotoReviewModal";
import "./CreateFinancialProofRequest.scss";
import FullScreenImage from "../../image/FullScreenImage.jsx";

const customImage =
  "https://res.cloudinary.com/dhkmu458i/image/upload/v1719989868/Untitled-2560-_C3_97-1703-px-1-1-400x267_susf5n.jpg";

export default function CreateFinancialProofRequest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState({
    emptyDescription: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("account"));

  const [valuation, setValuation] = useState({
    memberId: currentUser.id,
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
      const formData = new FormData();
      formData.append("memberId", valuation.memberId);

      valuation.photos.forEach((photo) => {
        formData.append("image", photo);
      });

      const createValuation = await axios.post(
        `http://localhost:8080/financial-proof/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (createValuation.status === 200) {
        toast.success("Financial proof request successfully submitted!");
        setValuation({
          memberId: currentUser.memberId,
          description: "",
          memberEstimate: "",
          photos: [],
        });
        setSelectedImages([]);
      } else {
        toast.error("Error submitting financial proof request.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting financial proof request.");
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
                sole and absolute discretion of <strong>FU-Auction</strong>.
                Please note, proof of funds may be accepted from a partner(s) or
                in an entity's name if the proper authorizations are provided.
              </p>
              <div className="text-center mt-4">
                <img
                  src={customImage}
                  alt="Custom Icon"
                  className="policy-icon"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-8 mb-4">
              <div className="text-center">
                <p className="h5">Photos</p>
                <hr />
                <PhotoReviewModal onOk={handleImagesUpload} />
                {selectedImages.length > 0 && (
                  <FullScreenImage imageUrls={selectedImages} />
                )}
                <p className="pt-2 text-muted">JPEG, PNG, PDF</p>
              </div>
              <div className="text-center mt-5">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
