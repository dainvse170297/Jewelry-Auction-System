import axios from "axios";
import React, { useEffect, useState } from "react";
import Paginator from "../../common/Paginator";
import './style.scss';

export default function MyValuationRequest({ id }) {
  const [ValuationRequest, setValuationRequest] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(8);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log("New Page:", pageNumber);
  };

  useEffect(() => {
    // setIsLoading(true)
    const getInfo = async () => {
      try {
        axios
          .get(`http://localhost:8080/valuation/view-sent-request/${id}`)
          .then((result) => {
            setValuationRequest(result.data);
          });
      } catch (error) {
        console.log("Error:", error.message);
        setErrorMsg("Error fetching data from server");
      }
    };
    getInfo();
  }, []);

  const calculateTotalPage = (itemPerPage, ValuationRequest) => {
    const totalItem = ValuationRequest.length;
    return Math.ceil(totalItem / itemPerPage);
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = ValuationRequest.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="container">
      <div className="row">
        <div className="shpping__cart__table">
          <table>
            <thead></thead>
            <tbody>
              {currentItems.map((request, index) => (
                <tr key={index} >
                  <td className='product__cart__item spad'>
                    <div className="product__cart__item__pic">
                      <img src={request.valuationImages[0].imageUrl} alt="Photo" width={'100px'} height={'100px'} />
                    </div>
                  </td>
                  <td>
                    <div className="product__cart__item__text ms-3">
                      <h6>Time Request: {request.timeRequest}</h6>
                      <p>{request.description}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex align-items-center justify-content-center">
            <Paginator
              currentPage={currentPage}
              totalPages={calculateTotalPage(itemPerPage, ValuationRequest)}
              onPageChange={handlePageChange}
            ></Paginator>
          </div>
        </div>
      </div>
    </div >
  );
}
