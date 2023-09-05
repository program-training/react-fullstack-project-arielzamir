import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/trips">
        <button>Go to all the trips</button>
      </Link>
      <Link to="/register">
        <button>Go to Registration</button>
      </Link>
      <Link to="/login">
        <button>Go to Login</button>
      </Link>
    </div>
  );
};

export default Home;
