import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./account.scss";
import { Button } from "react-bootstrap";
import { AddManageAccount } from "./AccountManage";

const UserManage = () => {
  const [staffAccounts, setStaffAccounts] = useState([]);
  const [input, setInput] = useState("");
  const [filteredStaff, setFilteredStaff] = useState([]);

  useEffect(() => {
    setStaffAccounts([
      {
        id: 1,
        username: "staff1",
        fullName: "Nguyen Van A",
        role: "STAFF",
      },
      {
        id: 2,
        username: "staff2",
        fullName: "Hoang Huy Hoang",
        role: "STAFF",
      },
      {
        id: 3,
        username: "staff3",
        fullName: "Nguyen Van Dai",
        role: "STAFF",
      },
    ]);
    setFilteredStaff(staffAccounts);
  }, []);

  useEffect(() => {
    setFilteredStaff(
      staffAccounts.filter((staff) =>
        staff.fullName.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input]);

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-11">
        <div className="row">
          <h2 className="text-center mb-4">User Management</h2>
          <div className="row">
            <div className="d-flex align-items-center border rounded-1 mb-3 py-2">
              <div className="h5 mx-2 my-0">Options:</div>
              <AddManageAccount />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="row">
              <div className="h5 text-center">Staff Accounts</div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-sm-10 col-lg-6">
                <div className="d-flex align-items-center input-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    placeholder="Search staff"
                    type="text"
                    className="search-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-2 d-flex justify-content-center">
              {staffAccounts.length === 0 ? (
                <div className="text-center">No staff account</div>
              ) : (
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
                    {filteredStaff.map((staff, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{staff.username}</td>
                        <td>{staff.fullName}</td>
                        <td>{staff.role}</td>
                        <td>
                          <Button variant="primary" className="mx-2">
                            Edit
                          </Button>
                          <Button variant="danger" className="mx-2">
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
