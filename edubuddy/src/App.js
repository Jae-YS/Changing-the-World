import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    educationLevel: '',
  });

  const [availability, setAvailability] = useState({
    startTime: '',
    endTime: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Process the data
  };

  return (
    <div className="App" style={{ width: '1680px', height: '1024px', background: '#FFF' }}>
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
            <label htmlFor="educationLevel">What education level are you at?</label>
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

export default App;
