import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });

  const inputRef = useRef();

  const [errorMsg, setErrorMsg] = useState(null);

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setAuth({ ...auth, [name]: value });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(auth);
    try {
      const formData = new FormData();
      formData.append("username", auth.username);
      formData.append("password", auth.password);
      const response = await axios
        .post("http://localhost:8080/auth/token", formData)
        .then((res) => {
          if (res.data.token && res.data.account.roleName === "MEMBER") {
            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem("account", JSON.stringify(res.data.account));
            toast.success("Login successful");
            const redirectTo = location.state?.from || "/";
            setTimeout(() => {
              navigate(redirectTo);
            }, 1000);
          } else {
            setErrorMsg("Invalid username or password");
          }
        });
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else if (error.request) {
        setErrorMsg("Server error");
      } else {
        setErrorMsg("An error occurred");
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <h4 className="text-center mb-5">SIGN IN</h4>
          <form action="" method="" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                ref={inputRef}
                type="text"
                className=""
                id="username"
                name="username"
                value={auth.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className=""
                id="password"
                name="password"
                autoComplete="off"
                value={auth.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group form-check mt-3">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" /> Remember
                me
              </label>
            </div>
            <div className="mt-3">
              No account yet?{" "}
              <a className="register" href="/sign-up">
                Create an account
              </a>
            </div>
            {errorMsg && (
              <div className="alert alert-danger mt-3">{errorMsg}</div>
            )}
            <button type="submit" className="login-btn mt-3">
              LOG IN
            </button>
          </form>
          <ToastContainer />
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default Login;
