import axios from "axios";
import React, { useEffect, useState } from "react";
import Paginator from "../../common/Paginator";
import './style.scss';

export default function MyValuationRequest({ id }) {
  const [valuationRequests, setValuationRequests] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [sortOrder, setSortOrder] = useState('');
  const [valuationStatus, setValuationStatus] = useState('');

  useEffect(() => {
    const getInfo = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/valuation/view-sent-request/${id}`);
        setValuationRequests(result.data);
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    getInfo();
  }, [id]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleStatusChange = (e) => {
    setValuationStatus(e.target.value);
  };

  const applySortingAndFiltering = (items) => {
    let filteredItems = items;

    // Apply filtering
    if (valuationStatus) {
      filteredItems = filteredItems.filter(item => item.valuationStatus === valuationStatus);
    }

    // Apply sorting
    if (sortOrder === 'asc') {
      filteredItems.sort((a, b) => new Date(a.timeRequest) - new Date(b.timeRequest));
    } else if (sortOrder === 'desc') {
      filteredItems.sort((a, b) => new Date(b.timeRequest) - new Date(a.timeRequest));
    }

    return filteredItems;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredAndSortedItems = applySortingAndFiltering(valuationRequests);
  const currentItems = filteredAndSortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const calculateTotalPage = (itemsPerPage, items) => {
    const totalItem = items.length;
    return Math.ceil(totalItem / itemsPerPage);
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="sortOrder">Sort by Time Request:</label>
          <select id="sortOrder" className="form-control" value={sortOrder} onChange={handleSortChange}>
            <option value="">--Select--</option>
            <option value="asc">Oldest</option>
            <option value="desc">Newest</option>
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="valuationStatus">Filter by Valuation Status:</label>
          <select id="valuationStatus" className="form-control" value={valuationStatus} onChange={handleStatusChange}>
            <option value="">--Select--</option>
            <option value="MEMBER_ACCEPTED">ACCEPTED</option>
            <option value="REQUESTED">REQUESTED</option>
            <option value="CANCELED">REJECTED</option>
            {/* Add more options based on your statuses */}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="shpping__cart__table">
          <table>
            <thead></thead>
            <tbody>
              {currentItems.map((request, index) => (
                <tr key={index}>
                  <td className='product__cart__item spad'>
                    <div className="product__cart__item__pic">
                      <img src={request.valuationImages[0]?.imageUrl} alt="Photo" width={'100px'} height={'100px'} />
                    </div>
                  </td>
                  <td>
                    <div className="product__cart__item__text ms-3">
                      <h6>Time Request: {new Date(request.timeRequest).toLocaleString()}</h6>
                      <p>{request.description}</p>
                      <p>{request.valuationStatus}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex align-items-center justify-content-center">
            <Paginator
              currentPage={currentPage}
              totalPages={calculateTotalPage(itemsPerPage, filteredAndSortedItems)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
