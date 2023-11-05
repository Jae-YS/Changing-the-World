import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function GettingStarted({ updateUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    educationLevel: "",
  });

  const [availability, setAvailability] = useState({
    startTime: "",
    endTime: "",
  });

  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleResult = async (userData, apiResponse) => {
    console.log("The API returned:", apiResponse);
    await updateUser(userData, apiResponse); // Wait for updateUser to complete

    // Add a debug statement to ensure navigate is called after updateUser
    console.log("Navigating to /schedule...");

    navigate("/schedule", { state: { apiResponse } });
  };

  var userInput = "";

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      ...formData,
      availability,
    };

    console.log(userData);

    // TODO: remove this once backend is set up
    userInput +=
      "Student's name is " +
      userData.name +
      ".\n" +
      "Student is available from " +
      String(userData.availability.startTime) +
      " to " +
      String(userData.availability.endTime) +
      ".\n";
    console.log(userInput);

    fetch("http://127.0.0.1:12000/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: userInput,
        type: "schedule",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response was not OK");
        }
      })
      .then((apiResponse) => {
        handleResult(userData, apiResponse);
      })
      .catch((error) => {
        console.error("Error");
      });
  };

  return (
    <div className="GettingStarted" style={{ background: "#FFF" }}>
      <header className="App-header">
        <h1>EduBuddy</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">What's your name?</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthDate">When were you born?</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="educationLevel">
              What education level are you at?
            </label>
            <select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
            >
              <option value="">Select your grade</option>
              {[...Array(12)].map((_, index) => (
                <option key={index} value={`Grade ${index + 1}`}>
                  Grade {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Daily Available Start Time:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={availability.startTime}
              onChange={handleAvailabilityChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">Daily Available End Time:</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={availability.endTime}
              onChange={handleAvailabilityChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default GettingStarted;
