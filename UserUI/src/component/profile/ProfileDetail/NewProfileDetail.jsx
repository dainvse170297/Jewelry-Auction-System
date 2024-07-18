import axios from "../../../utils/axiosCustomize";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  deleteCreditCard,
  getProfileDetail,
  postAddCreditCard,
  putEditCreditCard,
} from "../../../services/apiService";

const NewProfileDetail = () => {
  const memberId = JSON.parse(localStorage.getItem("account")).memberId;

  const [profile, setProfile] = useState({});
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCreditCard, setNewCreditCard] = useState({
    accountHolder: "",
    bankName: "",
    bankNumber: "",
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [bankNumberError, setBankNumberError] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [accountHolderError, setaccountHolderError] = useState("");
  const bankNames = [
    "TPBank",
    "NCB",
    "Agribank",
    "VPBank",
    "BIDV",
    "Vietcombank",
    "VietinBank",
    "MBBank",
    "ACB",
    "Techcombank",
    "HDBank",
    "OCB",
    "SCB",
  ];

  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        const response = await getProfileDetail(memberId);
        setProfile(response);
        if (response.creditCard) {
          setNewCreditCard({
            accountHolder: response.creditCard.accountHolder,
            bankName: response.creditCard.bankName,
            bankNumber: response.creditCard.bankNumber,
          });
        }
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

    if (id === "bankNumber") {
      if (!validateBankNumber(value)) {
        setBankNumberError("Bank number must be between 16 and 19 digits");
      } else {
        setBankNumberError("");
      }
    }

    if (id === "bankName" && value === "") {
      setBankNameError("Bank name is required");
    } else {
      setBankNameError("");
    }
  };

  const validateBankNumber = (bankNumber) => {
    return (
      /^[0-9]+$/.test(bankNumber) &&
      bankNumber.length >= 16 &&
      bankNumber.length <= 19
    );
  };

  const handleAddCreditCard = async () => {
    if (!newCreditCard.bankName) {
      setBankNameError("Please select a bank name");
      return;
    }
    if (!validateBankNumber(newCreditCard.bankNumber)) {
      return;
    }

    if (!newCreditCard.accountHolder) {
      setaccountHolderError("Account holder is required");
      return;
    }
    try {
      const data = await postAddCreditCard(memberId, newCreditCard);
      if (data) {
        setProfile(data);
        setShowCreditCardForm(false);
        toast.success("Credit Card Added Successfully");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleEditCreditCard = async () => {
    if (!newCreditCard.bankName) {
      setBankNameError("Please select a bank name");
      return;
    }
    if (!validateBankNumber(newCreditCard.bankNumber)) {
      return;
    }
    if (!newCreditCard.accountHolder) {
      setaccountHolderError("Account holder is required");
      return;
    }
    try {
      const data = await putEditCreditCard(memberId, newCreditCard);
      setProfile(data);
      setShowCreditCardForm(false);
      setIsEditing(false);
      toast.success("Credit Card Updated Successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDeleteCreditCard = async () => {
    setShowDeleteConfirmation(false);
    try {
      const data = await deleteCreditCard(memberId);
      if (data) {
        toast.success("Credit Card Deleted Successfully");
        setProfile((prev) => ({ ...prev, creditCard: null }));
        setNewCreditCard({ accountHolder: "", bankName: "", bankNumber: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete credit card");
    }
  };

  const handleApiError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.message === "Bank number already exists") {
        toast.error("Bank number already exists");
      } else {
        toast.error("Failed to add credit card");
      }
    } else {
      console.error(error);
      toast.error("An unexpected error occurred");
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
              <select
                className="form-control"
                id="bankName"
                value={newCreditCard.bankName}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select bank name
                </option>
                {bankNames.map((bank, index) => (
                  <option key={index} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              {bankNameError && (
                <small className="text-danger">{bankNameError}</small>
              )}
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
              {bankNumberError && (
                <small className="text-danger">{bankNumberError}</small>
              )}
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3 me-3"
              onClick={() => {
                setIsEditing(true);
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bankName">Bank Name</label>
              <select
                className="form-control"
                id="bankName"
                value={newCreditCard.bankName}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select bank name
                </option>
                {bankNames.map((bank, index) => (
                  <option key={index} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              {bankNameError && (
                <small className="text-danger">{bankNameError}</small>
              )}
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
                required
              />
              {bankNumberError && (
                <small className="text-danger">{bankNumberError}</small>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCreditCardForm(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={isEditing ? handleEditCreditCard : handleAddCreditCard}
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this credit card?</p>
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

export default NewProfileDetail;
