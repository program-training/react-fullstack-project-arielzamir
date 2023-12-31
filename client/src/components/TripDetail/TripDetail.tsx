// TripDetail.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./TripDetail.css";
import { BASE_URL } from "../../baseUrl";

interface Trip {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
}

const TripDetail: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const fetchTripById = async () => {
      try {
        const response = await fetch(`${BASE_URL}/trips/${tripId}`);
        const data = await response.json();
        setTrip(data);
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };

    fetchTripById();
  }, [tripId]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div id="card">
      <h1>Trip Detail</h1>
      <h2>{trip.name}</h2>
      <p>{trip.description}</p>
      <p>{trip.startDate}</p>
      <p>{trip.endDate}</p>
      <img src={trip.image} alt="image" id="card-image" />
      <Link to="/trips">
        <button id="go-back-button">Go Back to All Trips</button>
      </Link>
      <Link to={`/update-trip/${trip.id}`}>
        <button id="update-button">Update item</button>
      </Link>
    </div>
  );
};

export default TripDetail;
