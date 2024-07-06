import React from "react";
import { FaSearch } from "react-icons/fa";
import "./account.scss";
import { Button } from "react-bootstrap";

const UserManage = () => {
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-11">
        <div className="row">
          <h2 className="text-center mb-4">User Management</h2>
          <div className="row">
            <div className="d-flex align-items-center border rounded-1 mb-3 py-2">
              <div className="h5 mx-2 my-0">Options:</div>
              <Button variant="primary" className="mx-2">
                Add new user
              </Button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="row">
              <div className="h5 text-center">Staff Accounts</div>
            </div>
            <div className="row">
              <div className="col-sm-10 col-lg-6">
                <div className="d-flex align-items-center input-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    placeholder="Search staff"
                    type="text"
                    className="search-input"
                  />
                </div>
              </div>
            </div>
            <div className="row mt-2 d-flex justify-content-center">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>staff1</td>
                    <td>Staff</td>
                    <td>STAFF</td>
                    <td>
                      <Button variant="primary" className="mx-2">
                        Edit
                      </Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
