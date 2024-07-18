import React, { useEffect, useState } from "react";
import moment from "moment";
import { getValuationRequestById } from "../../../services/apiService";
import { useParams } from "react-router-dom";
import ImageGallery from "../../../views/image/ImageGallery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ValuationRequestLabel } from "../../../views/status/Statuslabel";

const ValuationRequestDetail = () => {
  const { id } = useParams();
  const [valuationRequest, setValuationRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchValuationRequestById = async () => {
      try {
        const data = await getValuationRequestById(id);
        setValuationRequest(data);
      } catch (err) {
        setError("Failed to fetch valuation request");
        console.error(err);
      }
    };
    setLoading(false);
    fetchValuationRequestById();
  }, [id]);

  if (!valuationRequest) return <div>No valuation request found</div>;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-sm-8">
          <div className="row">
            <div className="">
              <a onClick={goBack} className="a">
                <ArrowBackIcon /> BACK
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              <ImageGallery images={valuationRequest?.valuationImagesUrls} />
            </div>
            <div className="col-7">
              <h2>Valuation Request Detail</h2>
              <p>
                <strong>Time Request:</strong>
                {moment(valuationRequest.timeRequest).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </p>
              <p>
                <strong>Description:</strong> {valuationRequest.description}
              </p>
              <div className="d-flex align-items-center my-2">
                <strong>Status:</strong>{" "}
                <ValuationRequestLabel
                  status={valuationRequest.valuationStatus}
                />
              </div>
              <p>
                <strong>Estimate Price Range:</strong>{" "}
                {valuationRequest.estimatePriceMin
                  ? `$${valuationRequest.estimatePriceMin} -`
                  : ""}{" "}
                {valuationRequest.estimatePriceMax
                  ? `$${valuationRequest.estimatePriceMax}`
                  : "This valuation request has no estimate price range"}
              </p>
              <p>
                <strong>Member Estimate Price:</strong>

                {valuationRequest.memberEstimatePrice &&
                valuationRequest.memberEstimatePrice > 0 ? (
                  <>${valuationRequest.memberEstimatePrice}</>
                ) : (
                  "You have not provided an estimate price"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ValuationRequestDetail;
