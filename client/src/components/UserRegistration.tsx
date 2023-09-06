import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import "./UserRegistration.css";

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = "test-token";
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        console.log("User registered successfully");
      } else if (response.status === 400) {
        console.error("User already exists");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit" id="register-button">
          Register
        </button>
      </form>
      <Link to="/">
        <button id="index-button">Go back to main page</button>
      </Link>
    </div>
  );
}
