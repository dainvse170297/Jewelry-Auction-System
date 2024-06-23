import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createValuation.scss";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import ValuationInfo from "../../../info/valuation-request/ValuationInfo";
import PhotoUploadIcon from "@mui/icons-material/Backup";

import PhotoReviewModal from "./PhotoReviewModal";

export default function CreateValuation() {
  const navigate = useNavigate();
  const [emptyMessage, setEmptyMessage] = useState({
    emptyDescription: "",
  });

  const currentUser = JSON.parse(localStorage.getItem("account"));

  const [valuation, setValuation] = useState({
    memberId: currentUser.memberId,
    description: "",
    memberEstimate: "",
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
      formData.append("description", valuation.description);
      formData.append("memberEstimatePrice", valuation.memberEstimate);

      valuation.photos.forEach((photo, index) => {
        formData.append("image", photo);
      });

      const createValuation = await axios.post(
        `http://localhost:8080/valuation/create`,
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
        <h1 className="text-center py-4">Jewelry Valuation</h1>
        <form onSubmit={Create}>
          <div className="row d-flex justify-content-center mt-3">
            <div className="col-xxl-9 col-lg-10 col-11">
              <div className="row d-flex">
                {/* Form data */}
                <div className="pt-3 rounded-3 col-xxl-6 col-lg-5 col-11 px-3 form">
                  <h4>Expected Price</h4>
                  <hr />
                  <div className="row px-2 py-3 mb-2">
                    <Form.Group>
                      <Form.Control
                        placeholder=" Expected Price"
                        className="d-flex align-item-center"
                        type="number"
                        id="memberEstimate"
                        aria-describedby="passwordHelpBlock"
                        name="memberEstimate"
                        value={valuation.memberEstimate}
                        onChange={handleInputChange}
                        style={{ fontSize: "150%" }}
                      />
                    </Form.Group>
                  </div>
                  <h4 className="pb">
                    Description <span style={{ color: "red" }}>*</span>
                  </h4>
                  <hr />
                  <div className="row description mx-0">
                    <Form.Control
                      placeholder="Description"
                      type="text"
                      as="textarea"
                      id="description"
                      aria-describedby="passwordHelpBlock"
                      name="description"
                      value={valuation.description}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      style={{
                        height: "100%",
                        fontSize: "150%",
                      }}
                    />
                  </div>
                  <div className="row pt-5 px-4 justify-content-center">
                    <div className="col text-center px-4 border photo-box">
                      <p className="upload-title mt-4 mb-01">Photos</p>
                      <hr />
                      <div className="row d-flex justify-content-center px-2 mx-3 my-3">
                        <PhotoReviewModal onOk={handleImagesUpload} />
                        <p className="pt-2 file-formats">JPEG, PNG, PDG</p>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center px-5 mx-3 my-3">
                    <button type="submit"> Submit Valuation Request</button>
                  </div>
                </div>

                <div className="col-xxl-6 col-lg-5 col-11">
                  <div className="row">
                    <img src="src\assets\banner\banner2.png"></img>
                  </div>
                  <div className="row py-5">
                    <h4 className="text-center px-4">How we work?</h4>
                    <ValuationInfo />
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
