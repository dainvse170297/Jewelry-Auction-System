import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import LotPreview from "./LotPreview";
import Paginator from "../../common/Paginator";
import AuctionSession from "./AuctionSession";

const UpcomingSessionDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [sessionDetail, setSessionDetail] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(16);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log("New Page:", pageNumber);
  };

  const [lotRegisters, setLotRegisters] = useState([
    {
      lot: "",
      registeredPrice: "",
    },
  ]);

  useEffect(() => {
    try {
      const params = new URLSearchParams();
      params.append("memberId", "1");
      params.append("sessionId", id);

      const getAll = async () => {
        await axios
          .post(
            `http://localhost:8080/auction/session/upcoming/details`,
            params
          )
          .then((response) => {
            if (response.status === 200) {
              setSessionDetail(response.data);
              setLoading(false);

              const lotRegisters = response.data.Lots.map((lot) => {
                const register = response.data.Registers.find(
                  (reg) => reg.lotId === lot.id
                );
                return {
                  lot,
                  registeredPrice: register ? register.previousPrice : null,
                };
              });
              setLotRegisters(lotRegisters);
              console.log(lotRegisters);
            } else {
              console.log("Error");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getAll();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const calculateTotalPage = (itemPerPage, ValuationRequest) => {
    const totalItem = ValuationRequest.length;
    return Math.ceil(totalItem / itemPerPage);
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = lotRegisters.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          {/* <span className="sr-only">Loading...</span> */}
        </Spinner>
      ) : (
        <div className="col session-detail">
          {/* Session information */}
          <div className="row d-flex justify-content-center my-2">
            <div className="col-sm-10">
              <div className="row d-flex justify-content-center">
                <AuctionSession
                  session={sessionDetail.AuctionSession}
                  showImage={false}
                  showDetailBtn={false}
                />
              </div>
            </div>
          </div>
          {/* Lots information */}
          <div className="row d-flex justify-content-center">
            <div className="col-xxl-8 col-lg-10 col-11">
              <div className="row border">
                {currentItems.map((item) => (
                  <>
                    <div className="col-xxl-3 col-lg-4 col-6 my-3 d-flex justify-content-center">
                      <LotPreview
                        lot={item.lot}
                        registeredValue={item.registeredPrice}
                      />
                    </div>
                  </>
                ))}
              </div>
              <div className="flex align-items-center justify-content-center my-3">
                <Paginator
                  currentPage={currentPage}
                  totalPages={calculateTotalPage(itemPerPage, lotRegisters)}
                  onPageChange={handlePageChange}
                ></Paginator>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingSessionDetail;
