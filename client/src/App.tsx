import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Trips from "./components/Trips/Trips";
import UserRegistration from "./components/UserRegistration/UserRegistration";
import UserLogin from "./components/UserLogin/UserLogin";
import NewTripForm from "./components/NewTripForm/NewTripForm";
import TripDetail from "./components/TripDetail/TripDetail";
import UpdateTripForm from "./components/UpdateTripForm/UpdateTripForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trips/:tripId" element={<TripDetail />} />
        <Route path="/new-trip" element={<NewTripForm />} />
        <Route path="/update-trip/:tripId" element={<UpdateTripForm />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
