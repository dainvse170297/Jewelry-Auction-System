import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaBackward } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  getAllCategory,
  getValuationRequestById,
  postAddProduct,
} from "../../services/apiService";
import moment from "moment/moment";
import { Carousel, Col, Row } from "react-bootstrap";
import FullScreenImage from "../../view/image/FullScreenImage";

const SetupProductInfo = () => {
  const { id } = useParams();
  const [isWaiting, setIsWaiting] = useState(false);

  const [valuationRequest, setValuationRequest] = useState({
    memberId: "",
    estimatePriceMax: "",
    estimatePriceMin: "",
    valuationStatus: "",
    description: "",
    timeRequest: "",
    memberEstimatePrice: "",
    valuationImagesUrls: [],
  });

  const [product, setProduct] = useState({
    valuationRequestId: id,
    categoryId: "",
    name: "",
    description: "",
    estimatePriceMax: "",
    estimatePriceMin: "",
    photos: [],
    photoPreview: [],
    buyNowPrice: "",
    maxStep: "",
    pricePerStep: "",
    startPrice: "",
  });

  const [categories, setCategories] = useState([]);

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
        setProduct((preState) => ({
          ...preState,
          photoPreview: previews,
        }));
      })
      .catch((err) => toast.error("Error generating photo previews"));
  };

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const requestData = await getValuationRequestById(id);
        setValuationRequest(requestData);
      } catch (error) {
        console.log("Error ai fetchRequest: ", error);
      }
    };
    fetchRequest();
  }, [id]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getAllCategory();
        setCategories(categoryData);
      } catch (error) {
        console.log("Error fetchCategory: ", error);
      }
    };
    fetchCategory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      const selectedFiles = Array.from(files);
      setProduct({ ...product, photos: selectedFiles });
      generatePhotoPreview(selectedFiles);
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "" && name !== "photos") {
      toast.error(`${name} is required`);
    }
  };

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      product.name.trim() === "" ||
      product.description.trim() === "" ||
      product.categoryId.trim() === "" ||
      product.estimatePriceMax.trim() === "" ||
      product.estimatePriceMin.trim() === "" ||
      product.buyNowPrice.trim() === "" ||
      product.maxStep.trim() === "" ||
      product.pricePerStep.trim() === "" ||
      product.photos.length === 0 ||
      product.startPrice.trim() === ""
    ) {
      toast.warning("Need to fill all fields");
    } else {
      try {
        setIsWaiting(true);
        const addProduct = await postAddProduct(product);
        if (addProduct) {
          toast.success("Product submitted successfully!");
          setIsWaiting(false);
          setTimeout(() => {
            navigate("/valuation-request/received");
          }, 3000);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="ms-5 me-5">
      <h3 className="text-center mt-5">Set Up Jewelry</h3>
      <hr />
      <div className="row">
        <div className="col-lg-8">
          <h6 className="text-center text-secondary">Setup Data</h6>
          <div className="">
            <form action="" onSubmit={handleFormSubmit}>
              {/* SELECT CATEGORY */}

              <Form.Group controlId="name">
                <Form.Label>
                  Jewelry Name <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  aria-describedby="passwordHelpBlock"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>
                  Jewelry Description <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  aria-describedby="passwordHelpBlock"
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group controlId="categoryId">
                <Form.Label>
                  Jewelry category <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  size=""
                  aria-label="Default select example"
                  name="categoryId"
                  value={product.categoryId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  style={{
                    width: "50%",
                    maxWidth: "470px",
                    marginBottom: "1rem",
                  }}
                >
                  <option value="" className="text-secondary">
                    -- Select Category --
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="startPrice">
                    <Form.Label>
                      Start Price <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      aria-describedby="passwordHelpBlock"
                      name="startPrice"
                      value={product.startPrice}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="buyNowPrice">
                    <Form.Label>
                      Buy Now Price <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      aria-describedby="passwordHelpBlock"
                      name="buyNowPrice"
                      value={product.buyNowPrice}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="maxStep">
                    <Form.Label>
                      Max Step <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      aria-describedby="passwordHelpBlock"
                      name="maxStep"
                      value={product.maxStep}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className="col-sm-2"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="pricePerStep">
                    <Form.Label>
                      Price/Step <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      aria-describedby="passwordHelpBlock"
                      name="pricePerStep"
                      value={product.pricePerStep}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="estimatePriceMin">
                    <Form.Label>
                      Estimate Min Price <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      aria-describedby="passwordHelpBlock"
                      name="estimatePriceMin"
                      value={product.estimatePriceMin}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="estimatePriceMax">
                    <Form.Label>
                      Estimate Max Price <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      aria-describedby="passwordHelpBlock"
                      name="estimatePriceMax"
                      value={product.estimatePriceMax}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="photos" className="mb-3">
                <Form.Label>
                  Photos <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  name="photos"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />

                <div className="mt-4 text-center">
                  {" "}
                  {/* Modified */}
                  {!isWaiting ? (
                    <Button variant="primary" type="submit" size="lg">
                      Submit
                    </Button>
                  ) : (
                    <CircularProgress />
                  )}
                </div>
              </Form.Group>

              {/* SEE PHOTO WHEN INPUT FILE */}
              {product.photoPreview.length > 0 && (
                <label className="text-secondary">Photo preview</label>
              )}
              <div>
                {product.photoPreview.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      margin: "20px",
                    }}
                  />
                ))}
              </div>

              <ToastContainer />
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <h6 className="text-center text-secondary">Request Data</h6>
          <p>
            Member ID: <strong>{valuationRequest.memberId}</strong>
          </p>
          <p>
            Description: <strong>{valuationRequest.description}</strong>
          </p>
          <p>
            Min Price: $<strong>{valuationRequest.estimatePriceMin}</strong>
          </p>
          <p>
            Max Price: $<strong>{valuationRequest.estimatePriceMax}</strong>
          </p>
          <p>
            Time Request:{" "}
            <strong>
              {moment(valuationRequest.timeRequest).format(
                "DD/MM/yyyy HH:mm:ss"
              )}
            </strong>
          </p>
          {valuationRequest.memberEstimatePrice && (
            <p>
              Member Expected Price: $
              <strong>{valuationRequest.memberEstimatePrice}</strong>
            </p>
          )}
          {valuationRequest.valuationImagesUrls && (
            <div className="">
              <FullScreenImage
                imageUrls={valuationRequest.valuationImagesUrls}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupProductInfo;
