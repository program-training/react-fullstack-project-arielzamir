import { Link } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div>
      <h1 id="main-header">Welcome to the Home Page</h1>
      <Link to="/trips">
        <button className="home-buttons">Go to all the trips</button>
      </Link>
      <Link to="/register">
        <button className="home-buttons">Go to Registration</button>
      </Link>
      <Link to="/login">
        <button className="home-buttons">Go to Login</button>
      </Link>
    </div>
  );
};

export default Home;
