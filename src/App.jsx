import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
