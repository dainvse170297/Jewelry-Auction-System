import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createValuation.scss";
import { Form, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ValuationInfo from "../../../info/valuation-request/ValuationInfo";
import { postCreateValuation } from "../../../services/apiService";

import PhotoReviewModal from "./PhotoReviewModal";

export default function CreateValuation() {
  const navigate = useNavigate();
  const [emptyMessage, setEmptyMessage] = useState({
    emptyDescription: "",
  });

  const currentUser = JSON.parse(localStorage.getItem("account"));

  let memberId = null;
  if (currentUser) {
    memberId = currentUser.memberId;
  } else {
    navigate("/login", { state: { from: `/create-valuation` } });
  }

  const [valuation, setValuation] = useState({
    memberId: memberId,
    description: "",
    memberEstimate: "",
    photos: [],
  });

  const [isSending, setIsSending] = useState(false);

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
    setIsSending(true);
    if (valuation.description.trim() === "" || valuation.photos.length === 0) {
      setIsSending(false);
      toast.error("Please fill the description and upload at least one photo!");
      return;
    }
    try {
      const data = await postCreateValuation(valuation);

      if (data !== null) {
        toast.success("Successfully");
        setValuation({
          memberId: currentUser.memberId,
          description: "",
          memberEstimate: "",
          photos: [],
        });
      } else {
        toast.error("Error sent request!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sent request!");
    }
    setIsSending(false);
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
                  {!isSending && (
                    <div className="row d-flex justify-content-center px-5 mx-3 my-3">
                      <button type="submit"> Submit Valuation Request</button>
                    </div>
                  )}
                  {isSending && (
                    <div className="row d-flex justify-content-center px-5 mx-3 my-3">
                      <Spinner />
                    </div>
                  )}
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
