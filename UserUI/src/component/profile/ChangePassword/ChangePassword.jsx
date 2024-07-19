import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { postChangePassword } from "../../../services/apiService";
import { TextField } from "@mui/material";

const ChangePassword = () => {
  const memberId = JSON.parse(localStorage.getItem("account")).memberId;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function checkPassword() {
    let password = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmNewPassword").value;

    if (password !== confirmPassword) {
      document.getElementById("passwordMsg").innerHTML =
        "Incorrect confirm password!";
      return false;
    } else {
      document.getElementById("passwordMsg").innerHTML = "";
      return true;
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (oldPassword.trim() === "" || newPassword.trim() === "") {
      toast.warning("Please fill in all fields");
    } else if (checkPassword() === false) {
      toast.warning("Password does not match");
    } else {
      try {
        const response = await postChangePassword(
          memberId,
          oldPassword,
          newPassword
        );
        if (response.message) {
          toast.error(response.message);
          return;
        } else if (response) {
          toast.success("Password changed successfully");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      <h6>PASSWORD SETTINGS</h6>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <TextField
          required
          type="password"
          label="Enter old password"
          className="form-control"
          placeholder="Enter your old password"
          id="oldPassword"
          name="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <TextField
          type="password"
          label="Enter new password"
          className="form-control mt-3"
          placeholder="New password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <TextField
          required
          label="Confirm new password"
          type="password"
          className="form-control mt-3"
          placeholder="Confirm new password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          onKeyUp={checkPassword}
        />
        <hr />
        <div className="">
          <button type="submit" className="btn btn-danger me-3">
            Save
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default ChangePassword;
