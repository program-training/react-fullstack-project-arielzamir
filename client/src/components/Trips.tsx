import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Trips.css";

interface Trip {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
}

const Trips: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    // Fetch trips from the server and update the trips state
    const fetchTrips = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/trips");
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (tripId: number) => {
    try {
      // Send a DELETE request to the server to delete the trip
      await fetch(`http://localhost:3000/api/trips/${tripId}`, {
        method: "DELETE",
      });

      // Remove the deleted trip from the state
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <div>
      <h1>All Trips</h1>
      <Link to="/">
        <button>Go to Main Page</button>
      </Link>
      <Link to="/new-trip">
        <button>Create a New Trip</button>
      </Link>

      {/* Render the fetched data */}
      <div id="container">
        {trips.map((trip) => (
          <div key={trip.id} id="card">
            <h2>{trip.name}</h2>
            <p>{trip.description}</p>
            <p>{trip.startDate}</p>
            <p>{trip.endDate}</p>
            <button
              onClick={() => handleDelete(trip.id)}
              className="delete-button"
            >
              Delete item
            </button>
            <img src={trip.image} alt="image" id="card-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
