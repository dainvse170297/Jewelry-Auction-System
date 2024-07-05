import React, { useContext, useEffect, useRef, useState } from "react";
import "./login.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { postLogin } from "../../../services/userService";
import { UserContext } from "../../../context/UserContext";
import logo from '../../../assets/logos/newLogo.jpg'
import { Alert, Button, TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);
  const location = useLocation();

  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });

  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const data = await postLogin(auth.username, auth.password);
      if (
        data.token &&
        (data.account.roleName === "STAFF" ||
          data.account.roleName === "MANAGER")
      ) {
        login(
          data.account.staffId ? data.account.staffId : data.account.managerId,
          data.account.fullname,
          data.account.roleName,
          data.token
        );
        toast.success("Login successful");
        const redirectTo = location.state?.from || "/home";

        setTimeout(() => {
          navigate(redirectTo);
        }, 1000);
      } else {
        setErrorMsg("Invalid username or password");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else if (error.request) {
        setErrorMsg("Server error");
      } else {
        setErrorMsg("An error occurred");
        console.log(error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-4"></div>
        <div className="col-lg-4 login-form">

          <div className="">
            <img
              src={logo}
              alt="logo"
              className="login-img"
            />
          </div>
          <h4 className="text-center">LOG IN</h4>
          <form action="" method="" onSubmit={handleLogin}>

            <TextField
              id="username"
              name="username"
              label="Username"
              variant="standard"
              autoComplete="off"
              value={auth.username}
              onChange={handleInputChange}
              fullWidth
              required
              ref={inputRef} />

            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
              variant="standard"
              value={auth.password}
              onChange={handleInputChange}
              fullWidth
              required
              className="mt-3"
            />

            {errorMsg && (
              <Alert severity="error" className="mt-3">{errorMsg}</Alert>
            )}
            {loading ? (
              <Spinner animation="border" role="status" className="mt-3"></Spinner>
            ) : (
              <>
                <Button type="submit" variant="contained" className="mt-5" fullWidth>
                  <LockOutlinedIcon />
                  LOG IN
                </Button>
              </>
            )}
          </form>
          <ToastContainer />
          <div className="text-center fixed-bottom text-secondary">
            <h6>FU-Auction</h6>
          </div>
        </div>

        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default Login;
