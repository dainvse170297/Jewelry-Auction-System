import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const UpcomingSessionDetail = () => {
  const { id } = useParams();

  // useEffect(() => {
  //   const getAuctionSession = async () => {
  //     try{
  //       const params = new URLSearchParams();
  //       params.append("memberId", localStorage.getItem("memberId");
  //     }
  // }, [id]);
  return (
    <>
      <div>this is{id}</div>
    </>
  );
};

export default UpcomingSessionDetail;
