import React, { useEffect, useState } from "react";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <div>
      <div className="row">
        <div className="col-sm-3 d-flex justify-content-center">
          <div className="row">
            <strong style={{ fontSize: "130%" }}>{timeLeft.days}</strong>
          </div>
        </div>
        <div className="col-sm-3 d-flex justify-content-center">
          <div className="row">
            <strong style={{ fontSize: "130%" }}>{timeLeft.hours}</strong>
          </div>
        </div>
        <div className="col-sm-3 d-flex justify-content-center">
          <div className="row">
            <strong style={{ fontSize: "130%" }}>{timeLeft.minutes}</strong>
          </div>
        </div>
        <div className="col-sm-3 d-flex justify-content-center">
          <div className="row">
            <strong style={{ fontSize: "130%" }}>{timeLeft.seconds}</strong>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3 d-flex justify-content-center">
          <div className="row">DAYS</div>
        </div>
        <div className="col-sm-3 d-flex justify-content-center">
          <div className="row">HOURS</div>
        </div>
        <div className="col-sm-3 d-flex justify-content-center">
          <div className="row">MINUTES</div>
        </div>
        <div className="col-sm-3 d-flex justify-content-center">
          <div className="row">SECONDS</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
