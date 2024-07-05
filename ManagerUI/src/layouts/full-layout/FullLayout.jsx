import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

const FullLayout = () => {
  const [onHide, setOnHide] = useState(false);
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setOnHide(true);
    }
  }, []);

  return (
    <main>
      {/********header**********/}
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        {!onHide && (
          <div className="col-2">
            <Sidebar />
          </div>
        )}

        {/********Content Area**********/}
        <div className="container-fluid p-0">
          {/********Middle Content**********/}
          <Header onChange={() => setOnHide(!onHide)} />

          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
