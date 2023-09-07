import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Trips.css";
import { BASE_URL } from "../../baseUrl";

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
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${BASE_URL}/trips`);
        const data = await response.json();
        console.log(data);
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (tripId: number) => {
    try {
      await fetch(`${BASE_URL}/trips/${tripId}`, {
        method: "DELETE",
      });
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <div>
      <h1 id="main-header">All Trips</h1>
      <Link to="/">
        <button className="nav-buttons">Go to Main Page</button>
      </Link>
      <Link to="/new-trip">
        <button className="nav-buttons">Create a New Trip</button>
      </Link>
      <div id="container">
        {trips.map((trip) => (
          <div className="card" key={trip.id}>
            <Link to={`/trips/${trip.id}`}>
              <button>
                <h2>{trip.name}</h2>
                <p>{trip.description}</p>
                <p>{trip.startDate}</p>
                <p>{trip.endDate}</p>
                <img src={trip.image} alt="image" id="card-image" />
              </button>
            </Link>
            <button
              onClick={() => handleDelete(trip.id)}
              className="delete-button"
            >
              Delete item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
