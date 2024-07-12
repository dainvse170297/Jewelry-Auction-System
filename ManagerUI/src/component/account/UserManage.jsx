import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { getAllStaffAccount } from "../../services/apiService";
import Paginator from "../common/Paginator";
import "./account.scss";
import { AddManageAccount, EditManageAccount } from "./AccountManage";

const UserManage = () => {
  const [staffAccounts, setStaffAccounts] = useState([]);
  const [input, setInput] = useState("");
  const [filteredStaff, setFilteredStaff] = useState([]);

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(7)

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredStaff.slice(indexOfFirstItem, indexOfLastItem)

  const calculateTotalPage = (itemsPerPage, items) => {
    const totalItem = items.length;
    return Math.ceil(totalItem / itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchStaffAccounts = async () => {
      try {
        const res = await getAllStaffAccount();
        setStaffAccounts(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStaffAccounts();
  }, []);

  useEffect(() => {
    setFilteredStaff(staffAccounts);
  }, [staffAccounts]);

  useEffect(() => {
    setFilteredStaff(
      staffAccounts.filter((staff) =>
        staff.fullname.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input]);

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-11">
        <div className="row">
          <h2 className="text-center mb-4">STAFF Management</h2>
          <div className="row">
            <div className="d-flex align-items-center rounded-1 mb-3 py-2">
              <div className="h5 mx-2 my-0"></div>
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
                    placeholder="Search staff name"
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
                <>
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
                      {currentItems.map((staff, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{staff.username}</td>
                          <td>{staff.fullname}</td>
                          <td>{staff.roleName}</td>
                          <td>

                            <EditManageAccount staffId={staff.staffId} />

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Paginator
                    currentPage={currentPage}
                    totalPages={calculateTotalPage(itemsPerPage, filteredStaff)}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
