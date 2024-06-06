
const ValuationResponseDetails = ({ response }) => {
  return (
    <div>
      <h1>Valuation Response Details</h1>
      <div>
        <h3>Valuation Request ID: {response.valuation_request_id}</h3>
        <h3>Valuation Response ID: {response.id}</h3>
        <h3>Valuation Response: {response.response}</h3>
        <h3>Valuation Response Date: {response.response_date}</h3>
      </div>
    </div>
  );
}

export default ValuationResponseDetails;
