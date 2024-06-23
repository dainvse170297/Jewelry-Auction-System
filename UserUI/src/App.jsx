import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./component/home/Home.jsx";
import Login from "./component/auth/login/Login.jsx";
import CreateValuation from "./component/valuation_request/create/CreateValuation.jsx";
import Header from "./component/layout/header/Header.jsx";
import Selling from "./component/selling/Selling.jsx";
import ResponseValuationRequest from "./component/valuation_request/response/ValuationResponseList.jsx";
import MyValuationRequest from "./component/valuation_request/view/MyValuationRequest.jsx";
import UpcomingSessionList from "./component/auction-session/upcoming-session/UpcomingSessionList.jsx";
import Register from "./component/auth/register/Register.jsx";
import LiveLotDetail from "./component/auction-session/live-lot/LiveLotDetail.jsx";
import LiveSessionList from "./component/auction-session/live-session/LiveSessionList.jsx";
import UpcomingSessionDetail from "./component/auction-session/upcoming-session/UpcomingSessionDetail.jsx";
import LiveAuctionSessionDetail from "./component/auction-session/live-session/LiveAuctionSessionDetail.jsx";
import UpcomingSessionLot from "./component/auction-session/upcoming-session-lot/UpcomingSessionLot.jsx";
import CheckOut from "./component/checkout/CheckOut.jsx";
import CheckOutDetail from "./component/checkout/CheckOutDetail.jsx";
import PaymentCallback from "./component/checkout/PaymentCallback.jsx";
import PaymentSuccess from "./component/checkout/PaymentSuccess.jsx";
import PaymentFailure from "./component/checkout/PaymentFailure.jsx";
import Profile from "./component/profile/Profile.jsx";
import Footer from "./component/layout/footer/Footer.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-valuation" element={<CreateValuation />} />
          <Route path="/selling" element={<Selling />} />
          <Route path="/upcoming" element={<UpcomingSessionList />} />
          <Route
            path="/upcoming-session-detail/:id"
            element={<UpcomingSessionDetail />}
          />
          <Route path="/live-lot-detail/:id" element={<LiveLotDetail />} />

          <Route path="/live" element={<LiveSessionList />} />
          <Route
            path="/live-session-detail/:id"
            element={<LiveAuctionSessionDetail />}
          />
          <Route
            path="/valuation-request/:id"
            element={<MyValuationRequest />}
          />
          <Route
            path="/response-valuation-request/:id"
            element={<ResponseValuationRequest />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route
            path="/upcoming-session-lot/:lotId"
            element={<UpcomingSessionLot />}
          />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/checkout-detail" element={<CheckOutDetail />} />

          <Route path="/payment-callback" element={<PaymentCallback />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
