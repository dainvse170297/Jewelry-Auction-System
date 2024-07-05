import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./register.scss";
import { postRegister } from "../../../services/userService";

const Register = () => {
  const [member, setMember] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const [phoneNumberError, setPhoneNumberError] = useState("");

  const navigate = useNavigate();

  function checkPassword() {
    let password = document.getElementById("pwd").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      document.getElementById("passwordMsg").innerHTML =
        "Incorrect confirm password!";
      return false;
    } else {
      document.getElementById("passwordMsg").innerHTML = "";
      return true;
    }
  }

  function checkPhoneNumber() {
    let phone = document.getElementById("phone").value;

    if (/^\d*$/.test(phone) && phone.length <= 10) {
      // Check if the input is a number
      document.getElementById("phoneMsg").innerHTML = "";
      return true;
    } else {
      document.getElementById("phoneMsg").innerHTML =
        "Please enter a valid phone number";
      return false;
    }
  }

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "phone") {
      if (/^\d*$/.test(value)) {
        // Check if the input is a number
        setPhoneNumberError("");
      } else {
        setPhoneNumberError("Please enter a valid phone number");
      }
    }
    setMember({ ...member, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      checkPassword() === false ||
      checkPhoneNumber() === false ||
      member.username.trim() === "" ||
      member.password.trim() === "" ||
      member.confirmPassword.trim() === "" ||
      member.fullName.trim() === "" ||
      member.phone.trim() === "" ||
      member.email.trim() === "" ||
      member.address.trim() === "" ||
      phoneNumberError !== ""
    ) {
      toast.warning("Please fill in all fields");
    } else {
      try {
        const data = await postRegister(
          member.username,
          member.password,
          member.fullName,
          member.phone,
          member.email,
          member.address
        );
        toast("Account created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        if (error.response) {
          setErrorMsg(error.response.data.message);
          setTimeout(() => {
            setErrorMsg("");
          }, 3000);
        } else if (error.request) {
          setErrorMsg("");
        } else {
          setErrorMsg("Something went wrong");
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <h4 className="text-center mb-5">REGISTER</h4>

        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <form action="" method="" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                className=""
                id="username"
                placeholder="Username"
                name="username"
                required
                onChange={handleInputChange}
                value={member.username}
              />
            </div>

            <div className="form-group mt-3">
              <input
                type="password"
                className=""
                id="pwd"
                placeholder="Password"
                name="password"
                required
                autoComplete="off"
                onChange={handleInputChange}
                value={member.password}
              />
            </div>

            <div className="form-group mt-3">
              <input
                type="password"
                className=""
                id="confirmPassword"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                autoComplete="off"
                onKeyUp={checkPassword}
                onChange={handleInputChange}
                value={member.confirmPassword}
              />
              <p>
                <span id="passwordMsg" className="msg"></span>
              </p>
            </div>

            <div className="form-group mt-3">
              <input
                type="text"
                className=""
                id="fullName"
                placeholder="Full Name"
                name="fullName"
                required
                onChange={handleInputChange}
                value={member.fullName}
              />
            </div>

            <div className="form-group mt-3">
              <input
                type="text"
                className=""
                id="phone"
                placeholder="Phone Number"
                name="phone"
                required
                onChange={handleInputChange}
                onKeyUp={checkPhoneNumber}
                value={member.phone}
              />
              <p>
                <span id="phoneMsg" className="msg"></span>
              </p>
            </div>

            <div className="form-group mt-3">
              <input
                type="email"
                className=""
                id="email"
                placeholder="Email"
                name="email"
                required
                onChange={handleInputChange}
                value={member.email}
              />
            </div>

            <div className="form-group mt-3">
              <input
                type="text"
                className=""
                id="address"
                placeholder="Address"
                name="address"
                required
                onChange={handleInputChange}
                value={member.address}
              />
            </div>

            <div className="mt-3">
              Already have an account?{" "}
              <a className="register" href="/login">
                Log in
              </a>
            </div>

            {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}

            <button type="submit" className="login-btn mt-3">
              SIGN UP
            </button>
            <ToastContainer />
          </form>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default Register;
