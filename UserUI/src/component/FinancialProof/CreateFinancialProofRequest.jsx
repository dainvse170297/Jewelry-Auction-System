import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import PhotoReviewModal from "../valuation_request/create/PhotoReviewModal";

export default function CreateFinancialProofRequest() {
  const navigate = useNavigate();
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
  }, []);

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

    try {
      const formData = new FormData();
      formData.append("memberId", valuation.memberId);

      valuation.photos.forEach((photo, index) => {
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
        toast.error("Error set request!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error set request!");
    }
  }

  return (
    <>
      <div className="createValuation container-fluid">
        <ToastContainer />
        <h1 className="text-center py-4">Send Financial Proof Request</h1>
        <form onSubmit={Create}>
          <div className="row d-flex justify-content-center">
            <div className="col-9">
              {" "}
              {/* Adjusted grid column size */}
              <div className="row d-flex justify-content-center">
                <div className="pt-3 rounded-3 col-9 px-3 form">
                  {" "}
                  {/* Adjusted grid column size */}
                  <div className="row pt-5 px-4 justify-content-center">
                    <div className="col text-center px-4 border photo-box">
                      <p className="upload-title mt-4 mb-1">Photos</p>
                      <hr />
                      <div className="row d-flex justify-content-center px-2 mx-3 my-3">
                        <PhotoReviewModal onOk={handleImagesUpload} />
                        <p className="pt-2 file-formats">JPEG, PNG, PDG</p>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center px-5 mx-3 my-3">
                    <Button type="submit">Submit Valuation Request</Button>{" "}
                    {/* Used Bootstrap Button component */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
