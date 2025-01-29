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
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
