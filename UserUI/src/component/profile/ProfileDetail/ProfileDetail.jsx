import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const ProfileDetail = ({ memberId }) => {
  const [profile, setProfile] = useState({});
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCreditCard, setNewCreditCard] = useState({
    accountHolder: "",
    bankName: "",
    bankNumber: "",
  });

  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/member/profile/${memberId}`
        );
        setProfile(response.data);
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
      const response = await axios.post(
        `http://localhost:8080/member/profile/${memberId}/add-credit-card`,
        newCreditCard
      );

      // Handle success response
      if (response.status === 200) {
        setProfile(response.data); // Assuming the updated profile is returned
        setShowCreditCardForm(false);
        toast.success("Credit Card Added Successfully");
      }
    } catch (error) {
      // Handle error response
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
      const response = await axios.put(
        `http://localhost:8080/member/profile/${memberId}/edit-credit-card`,
        newCreditCard
      );
      setProfile(response.data); // Assuming the updated profile is returned
      setShowCreditCardForm(false);
      setIsEditing(false);

      if (response.status === 200) {
        toast.success("Credit Card Updated Successfully");
      }
    } catch (error) {
      console.error(error);
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
          {showCreditCardForm && isEditing ? (
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditCreditCard}
              >
                Save Credit Card
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowCreditCardForm(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
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
                className="btn btn-primary"
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
                className="btn btn-danger"
                onClick={async () => {
                  try {
                    const response = await axios.delete(
                      `http://localhost:8080/member/profile/${memberId}/delete-credit-card`
                    );
                    if (response.status === 200) {
                      toast.success("Credit Card Deleted Successfully");
                      setProfile((prev) => ({ ...prev, creditCard: null }));
                    }
                  } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete credit card");
                  }
                }}
              >
                Delete Credit Card
              </button>
            </form>
          )}
        </>
      ) : (
        <>
          {!showCreditCardForm ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowCreditCardForm(true)}
            >
              Add Credit Card
            </button>
          ) : (
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddCreditCard}
              >
                Save Credit Card
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowCreditCardForm(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default ProfileDetail;
