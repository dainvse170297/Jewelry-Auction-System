import React from "react";
import { Button } from "react-bootstrap";

export { EditManageAccount };

const EditManageAccount = (accountId) => {
  const [accountInfo, setAccountInfo] = useState({
    id: "",
    username: "",
    password: "",
    fullName: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleBlur = (e) => {
    const { name, value } = e.target;
  };

  const handleShow = () => {
    try {
      const getData = async () => {};
      getData();
    } catch (error) {
      console.log("Error: ", error);
    }
    setShow(true);
  };

  const confirmUpdate = async (e) => {
    if (1) {
    } else {
      try {
      } catch (error) {
        console.log("Error:", error.message);
        toast.error("Error when sending preliminary valuation");
      }
    }
  };

  return (
    <>
      <Button onClick={handleShow} variant="warning">
        Edit
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit account information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex justify-content-center">
            <div className="col-10 ">
              <h5 className="text-center py-1">Preliminary valuation</h5>
              <div className="row mb-3 mx-2 d-flex justify-content-center">
                <div className="col-sm-6">
                  <Form.Label htmlFor="estimateMin">
                    Minimum Price <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                </div>
                <div className="col-sm-6">
                  <Form.Control
                    type="number"
                    id="estimateMin"
                    aria-describedby="passwordHelpBlock"
                    name="estimateMin"
                    value={preliminaryValuation.estimateMin}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="row mb-3 mx-2 d-flex justify-content-center">
                <div className="col-sm-6">
                  <Form.Label htmlFor="estimateMax">
                    New Maximum Price <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                </div>
                <div className="col-sm-6">
                  <Form.Control
                    type="number"
                    id="estimateMax"
                    aria-describedby="passwordHelpBlock"
                    name="estimateMax"
                    value={preliminaryValuation.estimateMax}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <Modal.Footer className="row-sm-9 d-flex justify-content-center">
                <Button
                  className="btn-success mx-2"
                  onClick={PreliminaryConfirm}
                >
                  Send preliminary valuation
                </Button>
                <Confirm
                  message="Are you sure you want to reject this valuation request?"
                  mainLabel="Reject the request"
                  className="danger"
                  labelYes="Yes"
                  labelNo="No"
                  onConfirm={handleReject}
                />
              </Modal.Footer>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={!!selectedImageUrl} onHide={handleImageClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImageUrl}
            alt="Selected Product"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
