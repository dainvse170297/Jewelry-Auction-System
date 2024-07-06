import axios from "../../../utils/axiosCustomize";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import ReactToastify CSS
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import {
  deleteCreditCard,
  getProfileDetail,
  postAddCreditCard,
  putEditCreditCard,
} from "../../../services/apiService";

const ProfileDetail = ({ memberId }) => {
  const [profile, setProfile] = useState({});
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCreditCard, setNewCreditCard] = useState({
    accountHolder: "",
    bankName: "",
    bankNumber: "",
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        const response = await getProfileDetail(memberId);
        setProfile(response);
      } catch (error) {
        console.error(error);
      }
    };
    getMemberInfo();
  }, [memberId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewCreditCard((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddCreditCard = async () => {
    try {
      const data = await postAddCreditCard(memberId, newCreditCard);
      if (data !== null) {
        setProfile(data); // Assuming the updated profile is returned
        setShowCreditCardForm(false);
        toast.success("Credit Card Added Successfully");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.message === "Bank number already exists") {
          toast.error("Bank number already exists");
        } else {
          toast.error("Failed to add credit card");
        }
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleEditCreditCard = async () => {
    try {
      const data = await putEditCreditCard(memberId, newCreditCard);
      setProfile(data); // Assuming the updated profile is returned
      setShowCreditCardForm(false);
      setIsEditing(false);
      window.location.reload();
      toast.success("Credit Card Updated Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCreditCard = async () => {
    setShowDeleteConfirmation(false);
    try {
      const data = await deleteCreditCard(memberId);
      if (data !== null) {
        toast.success("Credit Card Deleted Successfully");
        setProfile((prev) => ({ ...prev, creditCard: null }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete credit card");
    }
  };

  return (
    <>
      <ToastContainer />
      <h6>YOUR PROFILE INFORMATION</h6>
      <hr />

      <form>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            aria-describedby="fullNameHelp"
            placeholder="Enter your fullname"
            defaultValue={profile.fullname}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Address</label>
          <textarea
            className="form-control autosize"
            id="bio"
            placeholder="Write something about you"
            style={{
              overflow: "hidden",
              overflowWrap: "break-word",
              resize: "none",
              height: 62,
            }}
            defaultValue={profile.address}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="url"
            placeholder="Enter your website address"
            defaultValue={profile.phone}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Email Address</label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Enter your location"
            defaultValue={profile.email}
            readOnly
          />
        </div>
      </form>

      <h6 className="mt-3">BANK INFORMATION</h6>
      <hr />
      {profile.creditCard ? (
        <>
          <form>
            <div className="form-group">
              <label htmlFor="accountHolder">Account Holder</label>
              <input
                type="text"
                className="form-control"
                id="accountHolder"
                placeholder="Enter account holder"
                defaultValue={profile.creditCard.accountHolder}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="bankName">Bank Name</label>
              <input
                type="text"
                className="form-control"
                id="bankName"
                placeholder="Enter bank name"
                defaultValue={profile.creditCard.bankName}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="bankNumber">Bank Number</label>
              <input
                type="text"
                className="form-control"
                id="bankNumber"
                placeholder="Enter bank number"
                defaultValue={profile.creditCard.bankNumber}
                readOnly
              />
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3 me-3"
              onClick={() => {
                setIsEditing(true);
                setNewCreditCard({
                  accountHolder: profile.creditCard.accountHolder,
                  bankName: profile.creditCard.bankName,
                  bankNumber: profile.creditCard.bankNumber,
                });
                setShowCreditCardForm(true);
              }}
            >
              Edit Credit Card
            </button>
            <button
              type="button"
              className="btn btn-danger mt-3 me-3"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              Delete Credit Card
            </button>
          </form>
        </>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowCreditCardForm(true)}
        >
          Add Credit Card
        </button>
      )}

      <Modal
        show={showCreditCardForm}
        onHide={() => setShowCreditCardForm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Credit Card" : "Add Credit Card"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="accountHolder">Account Holder</label>
              <input
                type="text"
                className="form-control"
                id="accountHolder"
                placeholder="Enter account holder"
                value={newCreditCard.accountHolder}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bankName">Bank Name</label>
              <input
                type="text"
                className="form-control"
                id="bankName"
                placeholder="Enter bank name"
                value={newCreditCard.bankName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bankNumber">Bank Number</label>
              <input
                type="text"
                className="form-control"
                id="bankNumber"
                placeholder="Enter bank number"
                value={newCreditCard.bankNumber}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCreditCardForm(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={isEditing ? handleEditCreditCard : handleAddCreditCard}
          >
            {isEditing ? "Save Credit Card" : "Add Credit Card"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Credit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this credit card?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCreditCard}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileDetail;
