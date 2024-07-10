import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Form from "react-bootstrap/Form";
import { getStaffAccountByStaffId, postCreateStaffAccount, postEditStaffAccount } from "../../services/apiService";
import { Button, TextField } from "@mui/material";
import { Add, EditRounded } from "@mui/icons-material";

export { EditManageAccount, AddManageAccount };

const AddManageAccount = () => {
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
    if (accountInfo.username.trim() === "" || accountInfo.password.trim() === "" || accountInfo.fullName.trim() === "") {
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
  }

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
            <TextField id="staffName" label="Staff Name" variant="outlined" required
              className="mt-3"
              type="text"
              name="fullName"
              value={accountInfo.fullName}
              onChange={handleInputChange}
            />

            <TextField id="staffUsername" label="Staff Username" variant="outlined" required
              className="mt-3"
              type="text"
              name="username"
              value={accountInfo.username}
              onChange={handleInputChange}
            />

            <TextField id="staffPassword" label="Password" variant="outlined" required
              className="mt-3"
              type="password"
              name="password"
              value={accountInfo.password}
              onChange={handleInputChange}
            />
          </div>


        </Modal.Body>
        <Modal.Footer className="row-sm-9 d-flex justify-content-center">
          <Button variant="contained" color="success" className=" mx-2" onClick={handleCreateStaff}>Create account</Button>
          <Button variant="outlined" color="error" className=" mx-2" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

const EditManageAccount = ({ staffId }) => {
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
    }
    getStaff();
  }, [])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    try {
      const getData = async () => { };
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

    if (newAccountInfo.username.trim() === "" || newAccountInfo.password.trim() === "" || newAccountInfo.fullName.trim() === "") {
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
      <Button variant="outlined" color="warning" onClick={handleShow} >
        <EditRounded />
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Staff account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-3 mx-2 d-flex justify-content-center">
            <TextField id="staffName" label="Staff Name" variant="outlined" required
              className="mt-3"
              type="text"
              name="fullName"
              value={newAccountInfo.fullName}
              onChange={handleInputChange}
            />

            <TextField id="staffUsername" label="Staff Username" variant="outlined"
              className="mt-3"
              type="text"
              name="username"
              value={newAccountInfo.username}
              onChange={handleInputChange}
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField id="staffPassword" label="Password" variant="outlined" required
              className="mt-3"
              type="password"
              name="password"
              value={newAccountInfo.password}
              onChange={handleInputChange}
            />
          </div>
          <Modal.Footer className="row-sm-9 d-flex justify-content-center">
            <Button variant="contained" color="warning" className="mx-2" onClick={confirmUpdate}>
              Save Change
            </Button>
            <Button variant="outlined" color="error" className=" mx-2" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Body >
      </Modal >
      <ToastContainer />
    </>
  );
};
