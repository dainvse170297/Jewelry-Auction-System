import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import PhotoReviewModal from "../valuation_request/create/PhotoReviewModal";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import "./CreateFinancialProofRequest.scss"; // Import your custom CSS

export default function CreateFinancialProofRequest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState({
    emptyDescription: "",
  });

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

  async function Create(e) {
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
        toast.success("Successfully");
        setValuation({
          memberId: currentUser.memberId,
          description: "",
          memberEstimate: "",
          photos: [],
        });
      } else {
        toast.error("Error setting request!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error setting request!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container mt-5">
        <ToastContainer />
        <h1 className="text-center mb-4">Create Financial Proof Request</h1>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 mb-4">
            <form onSubmit={Create}>
              <div className="card shadow">
                <div className="card-body">
                  <div className="mb-4 text-center">
                    <p className="h5">Photos</p>
                    <hr />
                    <PhotoReviewModal onOk={handleImagesUpload} />
                    <p className="pt-2 text-muted">JPEG, PNG, PDF</p>
                  </div>
                  <div className="text-center">
                    <Button type="submit" disabled={loading}>
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
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-5 col-md-6 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title text-center policy-title">
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
                  funds must demonstrate your ability to bid up to your
                  requested limit. The acceptance of proof of funds documents is
                  made at the sole and absolute discretion of{" "}
                  <strong>FU-Auction</strong>. Please note, proof of funds may
                  be accepted from a partner(s) or in an entity's name if the
                  proper authorizations are provided.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
