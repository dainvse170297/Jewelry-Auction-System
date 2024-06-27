import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { Container } from "react-bootstrap";

const FullLayout = () => {
  return (
    <main>
      {/********header**********/}
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <div className="col-2">
          <Sidebar />
        </div>
        {/********Content Area**********/}
        <div className="container-fluid p-0">
          {/********Middle Content**********/}
          <Header />

          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
