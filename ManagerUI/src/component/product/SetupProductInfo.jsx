import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaBackward } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const SetupProductInfo = () => {
  const { id } = useParams();
  const [isWaiting, setIsWaiting] = useState(false);

  const [valuationRequest, setValuationRequest] = useState({
    memberId: "",
    estimatePriceMax: "",
    estimatePriceMin: "",
    valuationStatus: "",
    description: "",
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
        const requestData = await axios.get(
          `http://localhost:8080/valuation/request/status/product-received/${id}`
        );
        setValuationRequest(requestData.data);
      } catch (error) {
        console.log("Error ai fetchRequest: ", error);
      }
    };
    fetchRequest();
  }, [id]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await axios.get(
          `http://localhost:8080/category/all`
        );
        setCategories(categoryData.data);
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
        //http://localhost:8080/product/add-product
        const formData = new FormData();
        formData.append("valuationRequestId", product.valuationRequestId);
        formData.append("categoryId", product.categoryId);
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("estimatePriceMax", product.estimatePriceMax);
        formData.append("estimatePriceMin", product.estimatePriceMin);
        formData.append("buyNowPrice", product.buyNowPrice);
        formData.append("maxStep", product.maxStep);
        formData.append("pricePerStep", product.pricePerStep);
        formData.append("startPrice", product.startPrice);
        product.photos.forEach((photo, index) => {
          formData.append("photos", photo);
        });
        setIsWaiting(true);
        const addProduct = await axios
          .post("http://localhost:8080/product/add-product", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Form submitted:", response.data);
            toast.success("Product submitted successfully!");
            setIsWaiting(false);
            setTimeout(() => {
              navigate("/valuation-request/received");
            }, 5000);
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            toast.error("Error submitting form");
            setIsWaiting(false);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="ms-5 me-5">
          <div className="mt-3">
            <Link to={"/valuation-request/received"}>
              <FaBackward />
            </Link>
          </div>
          <h3 className="text-center mt-5">Valuation Request Detail</h3>
          <div className="card">
            <div className="card-body">
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
            </div>
          </div>
          <div className="mt-3">
            <form action="" onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  {/* SELECT CATEGORY */}
                  <Form.Label htmlFor="inputPassword5">
                    Product category <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Select
                    size=""
                    aria-label="Default select example"
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
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
                  {/* INPUT PRODUCT NAME */}
                  <Form.Label htmlFor="name">
                    Product Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    aria-describedby="passwordHelpBlock"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {/* INPUT PRODUCT DESCRIPTION */}
                  <Form.Label htmlFor="description">
                    Product Description <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="description"
                    aria-describedby="passwordHelpBlock"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />

                  {/* INPUT Lot START PRICE */}
                  <Form.Label htmlFor="startPrice">
                    Start Price <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="startPrice"
                    aria-describedby="passwordHelpBlock"
                    name="startPrice"
                    value={product.startPrice}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />

                  {/* INPUT Lot BUY NOW PRICE */}
                  <Form.Label htmlFor="buyNowPrice">
                    Buy Now Price <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="buyNowPrice"
                    aria-describedby="passwordHelpBlock"
                    name="buyNowPrice"
                    value={product.buyNowPrice}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />

                  {/* INPUT Lot MAX STEP */}
                  <Form.Label htmlFor="maxStep">
                    Max Step <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    id="maxStep"
                    aria-describedby="passwordHelpBlock"
                    name="maxStep"
                    value={product.maxStep}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="col-sm-2"
                  />

                  {/* INPUT Lot PRICE PER STEP */}
                  <Form.Label htmlFor="pricePerStep">
                    Price/Step <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="pricePerStep"
                    aria-describedby="passwordHelpBlock"
                    name="pricePerStep"
                    value={product.pricePerStep}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />

                  <div className="mt-4">
                    {!isWaiting ? (
                      <Button variant="primary" type="submit" size="lg">
                        Submit
                      </Button>
                    ) : (
                      <>
                        <CircularProgress />
                      </>
                    )}
                  </div>
                </div>
                {/* INPUT PRODUCT ESTIMATE MIN PRICE */}
                <div className="col-lg-6">
                  <Form.Label htmlFor="estimatePriceMin">
                    Estimate Min Price <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="estimatePriceMin"
                    aria-describedby="passwordHelpBlock"
                    name="estimatePriceMin"
                    value={product.estimatePriceMin}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {/* INPUT PRODUCT ESTIMATE MAX PRICE */}
                  <Form.Label htmlFor="estimatePriceMax">
                    Estimate Max Price <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="estimatePriceMax"
                    aria-describedby="passwordHelpBlock"
                    name="estimatePriceMax"
                    value={product.estimatePriceMax}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {/* INPUT PRODUCT PHOTO */}
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>
                      Photos <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      id="photos"
                      name="photos"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  {/* SEE PHOTO WHEN INPUT FILE */}
                  <label htmlFor="" className="text-secondary">
                    Photo preview
                  </label>
                  <div className="">
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
                </div>
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupProductInfo;
