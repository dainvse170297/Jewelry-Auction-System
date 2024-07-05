import React from "react";
import { MutatingDots } from "react-loader-spinner";

const Loading = ({ delaytime }) => {
  return (
    <div className="row d-flex justify-content-center">
      <div className="col">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#70a1ff"
          secondaryColor="#C2D2FF"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
        />
      </div>
    </div>
  );
};

export default Loading;
