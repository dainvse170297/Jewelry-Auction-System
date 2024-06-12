import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "../../countdown/Countdown";
import "./upcoming-session.scss";

const UpcomingSession = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAll = async () => {
      await axios
        .get("http://localhost:8080/auction/session/upcoming")
        .then((response) => {
          setUpcomingSessions(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAll();
  }, []);

  return (
    <div className="container-fluid upcoming-session">
      <div className="row">
        <h1 className="text-center py-3">Upcoming Session</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-sm-8 mb-5">
          <hr />
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          {loading ? (
            <span>Loading</span>
          ) : (
            upcomingSessions.map((session, index) => (
              <div className="row session-cart">
                <div className="col-sm-4">
                  <div className="row">
                    <img
                      className="img-fluid"
                      src={session.defaultImageURL}
                      alt="..."
                    />
                  </div>
                  <div className="row d-flex justify-content-center">
                    <div className="col-sm-10 my-3">
                      <Countdown targetDate={session.startTime} />
                    </div>
                  </div>
                </div>
                <div className="col-sm-8 d-flex justify-content-center text-center">
                  <div className="">
                    <h3 className="py-3">{session.name}</h3>
                    <h5>{session.description}</h5>
                    <h4 className="py-4">
                      Time:
                      <strong>
                        {" "}
                        {new Date(session.startTime).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </strong>{" "}
                      -{" "}
                      <strong>
                        {new Date(session.endTime).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </strong>
                    </h4>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingSession;
