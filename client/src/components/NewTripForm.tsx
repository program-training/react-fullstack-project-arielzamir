import React, { useState, useRef, ChangeEvent } from "react";
import { Link } from "react-router-dom";

export default function NewTripForm() {
  const idRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    image: "",
  });

  const [imageSource, setImageSource] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "image") {
      setImageSource(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = "test-token";
      const response = await fetch("http://localhost:3000/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ ...formData, image: imageSource }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const savedData = await response.json();

      setFormData({
        ...formData,
        id: savedData.id,
      });

      idRef.current?.focus();

      console.log("Data saved:", savedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter an ID"
          name="id"
          ref={idRef}
          value={formData.id}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Enter a name"
          name="name"
          ref={nameRef}
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Enter a destination"
          name="destination"
          ref={destinationRef}
          value={formData.destination}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Enter startDate"
          name="startDate"
          ref={startDateRef}
          value={formData.startDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Enter endDate"
          name="endDate"
          ref={endDateRef}
          value={formData.endDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Enter the source of the image"
          name="image"
          value={imageSource}
          onChange={handleInputChange}
        />
        {imageSource && <img src={imageSource} alt="Trip Image" />}
        <button type="submit">Save</button>
      </form>
      <Link to="/trips">
        <button>Go to all the trips</button>
      </Link>
    </div>
  );
}
