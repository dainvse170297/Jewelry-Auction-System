import { Link } from "react-router-dom";
import "./valuation-info.scss";

const ValuationInfo = () => {
  return (
    <div>
      <div className="valuation-info">
        {/* <div className="row">
          <h2>Valuation Flow</h2>
        </div> */}
        <div className="row">
          <p>
            In today’s dynamic business landscape, accurate valuation of assets,
            companies, or investment opportunities is crucial. When initiating a
            valuation request, the process typically begins with the client or
            stakeholder submitting relevant information. This could include
            financial statements, market data, and specifics about the asset in
            question.
          </p>
        </div>
        <div className="row my-4 ">
          <Link
            to="/selling"
            className="d-flex justify-content-center no-underline"
          >
            <button>Learn about selling with TEAM 6</button>
          </Link>
        </div>
        <div className="row">
          <p>
            The valuation team then meticulously analyzes these inputs, applying
            various methodologies such as discounted cash flow (DCF), comparable
            company analysis (CCA), or precedent transactions. The goal is to
            arrive at a fair and objective value that reflects market
            conditions, risk factors, and growth prospects. Effective
            communication between the requesting party and the valuation experts
            ensures a smooth workflow, timely feedback, and ultimately,
            well-informed decision-making. Whether it’s a startup seeking
            funding, a merger negotiation, or estate planning, the valuation
            process serves as a compass guiding financial choices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValuationInfo;
