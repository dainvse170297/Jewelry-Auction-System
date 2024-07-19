import "./home.scss";
import React from "react";
import TaskButton from "./tasks/TaskButton";
const Home = () => {
  return (
    <div className="home row d-flex justify-content-center">
      <div className="col-sm-10">
        <div className="row">
          <h1 className="text-center">Welcome to my company</h1>
        </div>
        <div className="row">
          <TaskButton />
        </div>
      </div>
    </div>
  );
};

export default Home;
