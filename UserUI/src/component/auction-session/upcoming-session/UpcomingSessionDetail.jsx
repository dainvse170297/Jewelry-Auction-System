import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const UpcomingSessionDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    // Fetch data from API
  }, [id]);
  return (
    <>
      <div>this is{id}</div>
    </>
  );
};

export default UpcomingSessionDetail;
