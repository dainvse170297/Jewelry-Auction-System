import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createValuation.scss";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import ValuationInfo from "../../../info/valuation-request/ValuationInfo";
import PhotoUploadIcon from "@mui/icons-material/Backup";

export default function CreateValuation() {
  const navigate = useNavigate();
  const [emptyMessage, setEmptyMessage] = useState({
    emptyDescription: "",
  });

  const [valuation, setValuation] = useState({
    memberId: "1",
    description: "",
    memberEstimate: "",
    photos: [],
    photoPreview: [],
  });

  const generatePhotoPreview = (files) => {
    const previews = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previews)
      .then((previews) => {
        setValuation((preState) => ({
          ...preState,
          photoPreview: previews,
        }));
      })
      .catch((err) => toast.error("Error generating photo previews"));
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      const selectedFiles = Array.from(files);
      setValuation({ ...valuation, photos: selectedFiles });
      generatePhotoPreview(selectedFiles);
    } else {
      setValuation({ ...valuation, [name]: value });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setEmptyMessage({ ...emptyMessage, [name]: "This field is required" });
    }
  };

  async function Create(e) {
    e.defaultPrevented;

    try {
      const formData = new FormData();
      formData.append("memberId", "1");
      formData.append("description", valuation.description);
      formData.append("memberEstimate", valuation.memberEstimate);
      valuation.photos.forEach((photo, index) => {
        formData.append("image", photo);
      });

      const createValuation = await axios
        .post("http://localhost:8080/valuation/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.message);
          toast.success("Valuation Request Send Successfully!");
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
          toast.error("Request Failed!");
        });

      if (createValuation.status === 200) {
        toast.success("Successfully");
        toast("Sended to Manager");
        console.log(valuation);
      } else {
        toast.error("Error set request!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="createValuation container-fluid">
        <ToastContainer />
        <h1 className="text-center py-4">Jewelry Valuation</h1>

        <form onSubmit={Create}>
          <div className="row d-flex justify-content-center mt-3">
            <div className="col-sm-8">
              <div className="row">
                <div className="col-sm-6 px-5 mx-0">
                  {/* Get expected price from member */}
                  <div className="row">
                    <h4>Expected Price</h4>
                  </div>
                  <hr />
                  <div className="row px-2 py-3 mb-2">
                    <Form.Control
                      className="d-flex align-item-center"
                      type="number"
                      id="memberEstimate"
                      aria-describedby="passwordHelpBlock"
                      name="memberEstimate"
                      value={valuation.memberEstimate}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      style={{ fontSize: "150%" }}
                    />
                  </div>

                  {/* Get photo from member */}
                  <div className="row p-2 justify-content-center">
                    <div className="col text-center px-4 pb-4 border">
                      <p className="upload-title mt-4 mb-01">Photos</p>
                      <hr />
                      <div className="col upload-box rounded-5 mx-2 py-4 mt-3">
                        <div className="row mb-3">
                          <span>
                            <strong>
                              Choose a file or drag & drop it here
                            </strong>
                          </span>
                        </div>
                        <div className="row d-flex justify-content-center pb-4">
                          <div>
                            <PhotoUploadIcon
                              style={{
                                fontSize: "400%",
                              }}
                            />
                          </div>
                        </div>

                        <input
                          type="file"
                          multiple
                          id="photos"
                          name="photos"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={handleInputChange}
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="photos"
                          className="custom-file-upload mb-3"
                        >
                          <div className="p-2 border border-3 rounded-pill ">
                            <span style={{ fontSize: "90%" }}>Browse File</span>
                          </div>
                        </label>
                        <p className="file-formats">JPEG, PNG, PDG</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 px-2 mx-0">
                  <div className="row mx-0">
                    <h4 className="pb">
                      Description <span style={{ color: "red" }}>*</span>
                    </h4>
                    <hr />
                  </div>
                  {/* Description */}
                  <div className="row description p-3 mx-0">
                    <Form.Control
                      type="text"
                      as="textarea"
                      id="description"
                      aria-describedby="passwordHelpBlock"
                      name="description"
                      value={valuation.description}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      style={{
                        backgroundColor: "lightgray",
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="row">
                <h4 className="text-center">How we work?</h4>
                <ValuationInfo />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8">
              <div className="row">
                <div className="col-sm-6">
                  {/* Show review of images */}
                  <div className="row">
                    <span className="text-center">Photos preview</span>
                  </div>
                  <div className="review row">
                    {valuation.photoPreview.map((preview, index) => (
                      <div className="col-4 p-3">
                        <img
                          key={index}
                          src={preview}
                          alt={`Preview ${index}`}
                          className="img-fluid"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="row d-flex justify-content-center px-5 mx-3 my-3">
                    <button type="submit"> Submit Valuation Request</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </form>
      </div>
    </>
  );
}
