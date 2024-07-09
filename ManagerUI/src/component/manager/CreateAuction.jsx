import { Box, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getAllStaffAccount, postCreateSession } from "../../services/apiService";

const CreateAuction = () => {
  const [staffs, setStaffs] = useState([]);

  const [auctionSession, setAuctionSession] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    startingBid: '',
    staffId: '',
    image: '',
  });

  const [isWaiting, setIsWaiting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const getStaffAccounts = async () => {
      try {
        const staffData = await getAllStaffAccount();
        setStaffs(staffData);
      } catch (error) {
        console.log("Error fetching staff accounts", error);
      }
    };
    getStaffAccounts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuctionSession({ ...auctionSession, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setAuctionSession({ ...auctionSession, image: imageFile });
    setImagePreview(URL.createObjectURL(imageFile));
  };

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      auctionSession.name.trim() === "" ||
      auctionSession.description.trim() === "" ||
      auctionSession.staffId.trim() === "" ||
      auctionSession.startTime.trim() === "" ||
      auctionSession.startingBid.trim() === ""
    ) {
      toast.warning("Need to fill all fields");
    } else if (moment(auctionSession.startingBid).isAfter(moment(auctionSession.startTime))) {
      toast.error("Starting Bid Date must be before Start Date");
    } else if (moment(auctionSession.startTime).isAfter(moment(auctionSession.endTime))) {
      toast.error("Start Date must be before End Date");
    } else {
      try {
        setIsWaiting(true);
        const response = await postCreateSession(auctionSession);
        if (response.status === 'CREATED') {
          toast.success("Auction Session created successfully!");
          setIsWaiting(false);
          setTimeout(() => {
            navigate("/auction");
          }, 2000);
        } else {
          toast.error("Error creating auction session");
          setIsWaiting(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div className="ms-5 me-5">
        <h2 className="text-center mt-2">Create Auction Session</h2>
        <div className="mt-3">

          <form action="" onSubmit={handleFormSubmit}>
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                {/* Input session name */}

                <Form.Label htmlFor="name">
                  Session Name <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={auctionSession.name}
                  onChange={handleInputChange}
                />



                {/* Input session description */}

                <Form.Label htmlFor="description">
                  Session Description <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  id="description"
                  name="description"
                  value={auctionSession.description}
                  onChange={handleInputChange}
                />

                {/* Input session start date */}

                <Form.Label htmlFor="startTime">
                  Start Date <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={auctionSession.startTime}
                  min={moment().format("MM Do, YYYY")}
                  onChange={handleInputChange}
                />

                <Form.Label htmlFor="endTime">
                  End Date <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={auctionSession.endTime}
                  min={moment().format("MM Do, YYYY")}
                  onChange={handleInputChange}
                />

                {/* Select staff to manage session */}

                <Form.Label>
                  Choose Staff <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  size=""
                  aria-label="Default select example"
                  name="staffId"
                  value={auctionSession.staffId}
                  onChange={handleInputChange}
                >
                  <option value="" className="text-secondary">
                    -- Select Staff --
                  </option>
                  {staffs.map((staff, index) => (
                    <option
                      key={index}
                      value={staff.staffId}
                      className=""
                    >
                      {staff.fullname}
                    </option>
                  ))}
                </Form.Select>

                {/* Input session starting bid date */}

                <Form.Label>
                  Starting Bid Date <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  id="startingBid"
                  name="startingBid"
                  value={auctionSession.startingBid}
                  min={moment().format("MM Do, YYYY")}
                  onChange={handleInputChange}
                />

                <Form.Label>Banner Photo</Form.Label>
                <Form.Control
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="mb-3"
                />

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Auction Banner"
                    style={{ width: "300px", maxHeight: "200px" }}
                  />
                )}
                <br />
                {!isWaiting ? (
                  <Button variant="primary" type="submit" size="lg" className="mt-3">
                    Create
                  </Button>
                ) : (
                  <CircularProgress />
                )}
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default CreateAuction;
