import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { getAllMemberAccounts } from "../../services/apiService";
import Paginator from "../common/Paginator";
import "./account.scss";
import {
  AddMemberAccount,
  EditMemberAccount,
  DeleteMemberAccount,
} from "./AccountManage";

const MemberManage = () => {
  const [memberAccounts, setMemberAccounts] = useState([]);
  const [input, setInput] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);

  const calculateTotalPage = (itemsPerPage, items) => {
    const totalItem = items.length;
    return Math.ceil(totalItem / itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllMemberAccounts();
        setMemberAccounts(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredMembers(memberAccounts);
  }, [memberAccounts]);

  useEffect(() => {
    setFilteredMembers(
      memberAccounts.filter((member) =>
        member.fullname.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input]);

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-11">
        <div className="row">
          <h2 className="text-center mb-4">Member Account Management</h2>
          <div className="row">
            <div className="d-flex align-items-center rounded-1 mb-3 py-2">
              <div className="h5 mx-2 my-0"></div>
              <AddMemberAccount />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="row">
              <div className="h5 text-center">Member accounts</div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-sm-10 col-lg-6">
                <div className="d-flex align-items-center input-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    placeholder="Search member name"
                    type="text"
                    className="search-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-2 d-flex justify-content-center">
              {memberAccounts.length === 0 ? (
                <div className="text-center">No member account</div>
              ) : (
                <>
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">Member Id</th>
                        <th scope="col">Full name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((member, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{member.id}</strong>
                          </td>
                          <td>{member.fullname}</td>
                          <td>{member.email}</td>
                          <td>{member.phone}</td>
                          <td className="d-flex justify-content-center">
                            <EditMemberAccount member={member} />
                            <DeleteMemberAccount memberId={member.id} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Paginator
                    currentPage={currentPage}
                    totalPages={calculateTotalPage(
                      itemsPerPage,
                      filteredMembers
                    )}
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

export default MemberManage;
