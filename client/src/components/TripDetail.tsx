import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface Trip {
  id: number;
  title: string;
  description: string;
}

const TripDetail: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const fetchTripById = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/trips/${tripId}`
        );
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
    <div>
      <h1>Trip Details</h1>
      <Link to="/trips">
        <button>Go Back to All Trips</button>
      </Link>
      <h2>{trip.title}</h2>
      <p>{trip.description}</p>
    </div>
  );
};

export default TripDetail;
