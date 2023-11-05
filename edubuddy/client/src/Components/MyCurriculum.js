import React, { useState } from "react";
import "../App.css";

const MyCurriculum = ({ user, userCurriculum }) => {
  console.log(user);
  console.log(userCurriculum); // Find the start and end indices of the JSON array
  const response = userCurriculum.response;
  console.log(response);
  let list = [];
  let subjectsList = [];

  try {
    // Extract the JSON array from the response string
    const jsonArray = JSON.parse(response.match(/\[[\s\S]*\]/)[0]);

    // Create a list of JSON objects
    list = jsonArray.map((item) => {
      return {
        date: item[0],
        subject: item[1],
        description: item[2],
        homework: item[3],
      };
    });

    console.log(list);

    // Extract a list of unique subjects
    subjectsList = [...new Set(list.map((item) => item.subject))];

    console.log(subjectsList);
  } catch (error) {
    console.error("Error:", error);
  }

  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div className="MyCurriculum">
      <div className="curriculum-page">
        <h1>My Curriculum</h1>
        <h2>Level: {user.educationLevel} Grade</h2>
        <div className="subject-grid">
          {subjectsList.map((subject, index) => (
            <button
              key={index}
              className={`subject-button ${
                selectedSubject === subject ? "active" : ""
              }`}
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
              {list
                .filter(
                  (subjectData) => subjectData.subject === selectedSubject
                )
                .map((subjectData, index) => (
                  <li key={index}>
                    <strong>Date: {subjectData.date}</strong>
                    <br />
                    Description: {subjectData.description}
                    <br />
                    Homework: {subjectData.homework}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCurriculum;
