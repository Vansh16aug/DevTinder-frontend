import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Body from "./components/Body";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import store from "./redux/store";
import Feed from "./components/Feed";
import AuthPage from "./components/AuthPage";
import PP from "./components/policypages/PP";
import TermsAndCondition from "./components/policypages/TermsAndCondition";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/policypages/AboutUs";
import Disclaimer from "./components/policypages/Disclaimer";
import RefundCancellation from "./components/policypages/RefundCancellation";
import ShippingDelivery from "./components/policypages/ShippingDelivery";
import Chat from "./components/Chat";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Top-level route for the main layout */}
          <Route path="/" element={<Body />}>
            {/* Nested routes */}
            <Route index element={<Feed />} /> {/* Default child route */}
            <Route path="login" element={<AuthPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="privacy-policy" element={<PP />} />
            <Route path="terms" element={<TermsAndCondition />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="chat/:targetId" element={<Chat />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="refund-cancel" element={<RefundCancellation />} />
            <Route path="shipping" element={<ShippingDelivery />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
