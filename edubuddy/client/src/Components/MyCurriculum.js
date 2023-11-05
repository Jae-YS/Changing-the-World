import React, { useState } from 'react';
import '../App.css';


const subjects = {
  "Reading & Writing": {
    details: ["Know how to read", "Know how to write a paragraph", "Know how to write a poem"]
  },
  "Science": {
    details: ["Understand basic biology", "Explore earth sciences", "Introduction to physics"]
  },
  "Math": {
    details: ["Addition and subtraction", "Basic geometry", "Introduction to fractions"]
  },
  // ... other subjects
  "Arts & Craft": {
    details: ["Painting techniques", "Working with clay", "Recycled crafts"]
  },
  "Social Studies": {
    details: ["Local community", "Basic maps and locations", "Famous historical figures"]
  },
  "Physical Education": {
    details: ["Basic sports", "Health and nutrition", "Teamwork activities"]
  },
};

var level = "Level: 2nd Grade"

const MyCurriculum = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  return (
    <div className="MyCurriculum">
            <div className="curriculum-page">
      <h1>My Curriculum</h1>
      <h2>{level}</h2>
      <div className="subject-grid">
        {Object.keys(subjects).map(subject => (
          <button 
            key={subject}
            className={`subject-button ${selectedSubject === subject ? 'active' : ''}`}
            onClick={() => setSelectedSubject(subject)}
          >
            {subject}
          </button>
        ))}
      </div>
      {selectedSubject && (
        <div className="subject-details">
          <h3>{selectedSubject}</h3>
          <ul>
            {subjects[selectedSubject].details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>

  );
};

export default MyCurriculum;
