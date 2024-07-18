import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Form from "react-bootstrap/Form";
import {
  getStaffAccountByStaffId,
  postCreateStaffAccount,
  postEditStaffAccount,
} from "../../services/apiService";

import { postCreateMemberAccount } from "../../services/userService";
import { Button, TextField } from "@mui/material";
import { Add, EditRounded, DeleteRounded } from "@mui/icons-material";
import BankSelector from "./BankSelector";

export {
  AddStaffAccount,
  EditStaffAccount,
  AddMemberAccount,
  EditMemberAccount,
  DeleteMemberAccount,
};

const AddStaffAccount = () => {
  const [accountInfo, setAccountInfo] = useState({
    username: "",
    password: "",
    fullName: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
  };

  const handleCreateStaff = async () => {
    if (
      accountInfo.username.trim() === "" ||
      accountInfo.password.trim() === "" ||
      accountInfo.fullName.trim() === ""
    ) {
      toast.warning("You need to fill all the fields");
      return;
    }
    try {
      const response = await postCreateStaffAccount(accountInfo);
      if (response.message) {
        toast.error(response.message);
        return;
      } else if (response) {
        toast.success("New Staff added successfully");
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Create account failed");
    }
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleShow}>
        <Add />
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create new Staff account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-3 mx-2 d-flex justify-content-center">
            <TextField
              id="staffName"
              label="Staff Name"
              variant="outlined"
              required
              className="mt-3"
              type="text"
              name="fullName"
              value={accountInfo.fullName}
              onChange={handleInputChange}
            />

            <TextField
              id="staffUsername"
              label="Staff Username"
              variant="outlined"
              required
              className="mt-3"
              type="text"
              name="username"
              value={accountInfo.username}
              onChange={handleInputChange}
            />

            <TextField
              id="staffPassword"
              label="Password"
              variant="outlined"
              required
              className="mt-3"
              type="password"
              name="password"
              value={accountInfo.password}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="row-sm-9 d-flex justify-content-center">
          <Button
            variant="contained"
            color="success"
            className=" mx-2"
            onClick={handleCreateStaff}
          >
            Create account
          </Button>
          <Button
            variant="outlined"
            color="error"
            className=" mx-2"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

const EditStaffAccount = ({ staffId }) => {
  const [newAccountInfo, setNewAccountInfo] = useState({
    id: staffId,
    username: "",
    password: "",
    fullName: "",
  });

  useEffect(() => {
    const getStaff = async () => {
      try {
        const response = await getStaffAccountByStaffId(staffId);
        setNewAccountInfo({
          id: staffId,
          username: response.username,
          password: "",
          fullName: response.fullname,
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getStaff();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    try {
      const getData = async () => {};
      getData();
    } catch (error) {
      console.log("Error: ", error);
    }
    setShow(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccountInfo({
      ...newAccountInfo,
      [name]: value,
    });
  };

  const confirmUpdate = async () => {
    if (
      newAccountInfo.username.trim() === "" ||
      newAccountInfo.password.trim() === "" ||
      newAccountInfo.fullName.trim() === ""
    ) {
      toast.warning("You need to fill all the fields");
      return;
    }
    try {
      const response = await postEditStaffAccount(newAccountInfo);
      if (response.message) {
        toast.error(response.message);
        return;
      } else if (response) {
        toast.success("Staff account updated successfully");
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Button variant="outlined" color="warning" onClick={handleShow}>
        <EditRounded />
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Staff account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-3 mx-2 d-flex justify-content-center">
            <TextField
              id="staffName"
              label="Staff Name"
              variant="outlined"
              required
              className="mt-3"
              type="text"
              name="fullName"
              value={newAccountInfo.fullName}
              onChange={handleInputChange}
            />

            <TextField
              id="staffUsername"
              label="Staff Username"
              variant="outlined"
              className="mt-3"
              type="text"
              name="username"
              value={newAccountInfo.username}
              onChange={handleInputChange}
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              id="staffPassword"
              label="Password"
              variant="outlined"
              required
              className="mt-3"
              type="password"
              name="password"
              value={newAccountInfo.password}
              onChange={handleInputChange}
            />
          </div>
          <Modal.Footer className="row-sm-9 d-flex justify-content-center">
            <Button
              variant="contained"
              color="warning"
              className="mx-2"
              onClick={confirmUpdate}
            >
              Save Change
            </Button>
            <Button
              variant="outlined"
              color="error"
              className=" mx-2"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

const AddMemberAccount = () => {
  const [accountInfo, setAccountInfo] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
  };

  const handleCreateMemberAccount = async () => {
    if (
      accountInfo.username.trim() !== "" &&
      accountInfo.password.trim() !== "" &&
      accountInfo.fullName.trim() !== "" &&
      accountInfo.email.trim() !== "" &&
      accountInfo.phone.trim() !== "" &&
      accountInfo.address.trim() !== ""
    ) {
      // Valid input for creating new member account
      try {
        const response = await postCreateMemberAccount(
          accountInfo.username,
          accountInfo.password,
          accountInfo.fullName,
          accountInfo.email,
          accountInfo.phone,
          accountInfo.address
        );
        if (response.message) {
          toast.error(response.message);
          return;
        } else if (response) {
          toast.success("New Member added successfully");
          handleClose();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        console.log("Error: ", error);
        toast.error("Create account failed");
      }
    } else {
      // Invalid input for creating new member account
      toast.warning("You need to fill all the fields");
    }
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleShow}>
        <Add />
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create new Member account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-3 mx-2 d-flex justify-content-center">
            <TextField
              label="Member's full name"
              variant="outlined"
              required
              className="mt-3"
              type="text"
              name="fullName"
              value={accountInfo.fullName}
              onChange={handleInputChange}
            />

            <TextField
              label="Member Username"
              variant="outlined"
              required
              className="mt-3"
              type="text"
              name="username"
              value={accountInfo.username}
              onChange={handleInputChange}
            />

            <TextField
              label="Password"
              variant="outlined"
              required
              className="mt-3"
              type="password"
              name="password"
              value={accountInfo.password}
              onChange={handleInputChange}
            />

            <TextField
              label="Email"
              variant="outlined"
              required
              className="mt-3"
              type="email"
              name="email"
              value={accountInfo.email}
              onChange={handleInputChange}
            />

            <TextField
              label="Phone number"
              variant="outlined"
              required
              className="mt-3"
              type="text"
              name="phone"
              value={accountInfo.phone}
              onChange={handleInputChange}
            />

            <TextField
              label="Address"
              variant="outlined"
              required
              className="mt-3"
              type="text"
              name="address"
              value={accountInfo.address}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="row-sm-9 d-flex justify-content-center">
          <Button
            variant="contained"
            color="success"
            className=" mx-2"
            onClick={handleCreateMemberAccount}
          >
            Create account
          </Button>
          <Button
            variant="outlined"
            color="error"
            className=" mx-2"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

const EditMemberAccount = ({ memberId }) => {
  const [newMemberAccountInfo, setNewMemberAccountInfo] = useState({
    id: memberId,
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [newCreditCardInfo, setNewCreditCardInfo] = useState({
    id: "",
    accountHolder: "",
    bankNumber: "",
    bankName: "",
  });

  useEffect(() => {
    const getMember = async () => {
      try {
        // const response = await getStaffAccountByStaffId(staffId);
        //Update
        setNewMemberAccountInfo({
          id: memberId,
          username: "",
          password: "",
          fullName: "",
          email: "",
          phone: "",
          address: "",
        });

        setNewCreditCardInfo({
          id: "1",
          accountHolder: "",
          bankNumber: "",
          bankName: "",
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getMember();
  }, [memberId]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleMemberInfoChange = (e) => {
    const { name, value } = e.target;
    setNewMemberAccountInfo({
      ...newMemberAccountInfo,
      [name]: value,
    });
  };

  const handleCreditCardInfoChange = (e) => {
    const { name, value } = e.target;
    setNewCreditCardInfo({
      ...newCreditCardInfo,
      [name]: value,
    });
  };

  const handleBankSelect = (bankName) => {
    setNewCreditCardInfo({
      ...newCreditCardInfo,
      bankName: bankName,
    });
  };

  const confirmUpdate = async () => {
    if (
      newMemberAccountInfo.username.trim() !== "" &&
      newMemberAccountInfo.password.trim() !== "" &&
      newMemberAccountInfo.fullName.trim() !== "" &&
      newMemberAccountInfo.email.trim() !== "" &&
      newMemberAccountInfo.phone.trim() !== "" &&
      newMemberAccountInfo.address.trim() !== "" &&
      newCreditCardInfo.accountHolder.trim() !== "" &&
      newCreditCardInfo.bankNumber.trim() !== "" &&
      newCreditCardInfo.bankName.trim() !== ""
    ) {
      try {
        // const response = await postEditStaffAccount(newAccountInfo);
        // if (response.message) {
        //   toast.error(response.message);
        //   return;
        // } else if (response) {
        //   toast.success("Staff account updated successfully");
        //   handleClose();
        //   setTimeout(() => {
        //     window.location.reload();
        //   }, 2000);
        // }
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      toast.warning("You need to fill all the fields");
    }
  };

  return (
    <>
      <Button variant="outlined" color="warning" onClick={handleShow}>
        <EditRounded />
      </Button>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Member account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-3 d-flex">
            <div className="col-6">
              <div className="row">
                <div className="h5 text-center">Member Account</div>
              </div>
              <div className="row mb-3 mx-3 d-flex justify-content-center">
                <TextField
                  label="Member Name"
                  variant="outlined"
                  required
                  className="mt-3"
                  type="text"
                  name="fullName"
                  value={newMemberAccountInfo.fullName}
                  onChange={handleMemberInfoChange}
                />

                <TextField
                  label="Member Username"
                  variant="outlined"
                  className="mt-3"
                  type="text"
                  name="username"
                  value={newMemberAccountInfo.username}
                  onChange={handleMemberInfoChange}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  required
                  className="mt-3"
                  type="password"
                  name="password"
                  value={newMemberAccountInfo.password}
                  onChange={handleMemberInfoChange}
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  required
                  className="mt-3"
                  type="email"
                  name="email"
                  value={newMemberAccountInfo.email}
                  onChange={handleMemberInfoChange}
                />

                <TextField
                  label="Phone number"
                  variant="outlined"
                  required
                  className="mt-3"
                  type="text"
                  name="phone"
                  value={newMemberAccountInfo.phone}
                  onChange={handleMemberInfoChange}
                />

                <TextField
                  label="Address"
                  variant="outlined"
                  required
                  className="mt-3"
                  type="text"
                  name="address"
                  value={newMemberAccountInfo.address}
                  onChange={handleMemberInfoChange}
                />
              </div>
            </div>

            <div className="col-6">
              <div className="row">
                <div className="h5 text-center">Credit Card</div>
              </div>
              <div className="row mb-3 mx-3 d-flex justify-content-center">
                <TextField
                  label="Account Holder"
                  variant="outlined"
                  required
                  className="mt-3"
                  type="text"
                  name="accountHolder"
                  value={newCreditCardInfo.accountHolder}
                  onChange={handleCreditCardInfoChange}
                />

                <TextField
                  label="Bank Number"
                  variant="outlined"
                  required
                  className="mt-3"
                  type="text"
                  name="bankNumber"
                  value={newCreditCardInfo.bankNumber}
                  onChange={handleCreditCardInfoChange}
                />

                <BankSelector className="m-0" onBankSelect={handleBankSelect} />
              </div>
            </div>
          </div>
          <Modal.Footer className="row-sm-9 d-flex justify-content-center">
            <Button
              variant="contained"
              color="warning"
              className="mx-2"
              onClick={confirmUpdate}
            >
              Save Change
            </Button>
            <Button
              variant="outlined"
              color="error"
              className=" mx-2"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

const DeleteMemberAccount = ({ memberId }) => {
  return (
    <>
      <Button className="mx-2" variant="outlined" color="error">
        <DeleteRounded />
      </Button>
    </>
  );
};
