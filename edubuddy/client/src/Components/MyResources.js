import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function MyResources({ userCurriculum, user }) {

    const dataArray = [];

    const handleClick = () => {
        // Define the action to be taken when the button is clicked
        alert('Button clicked!');

        console.log(userCurriculum);
        console.log(user);
      
        const handleResult = async (apiResponse) => {
          console.log("The API returned:", apiResponse);
          // await updateUser(apiResponse); // Wait for updateUser to complete
      
          // Add a debug statement to ensure navigate is called after updateUser
          // console.log("Navigating to /schedule...");
      
          // navigate("/schedule", { state: { apiResponse } });
        };
      
        const response = userCurriculum.response;
        console.log(response);
        let list = [];
        let dateLists = [];
      
        try {
          const curriculumData = JSON.parse(response.match(/\[[\s\S]*\]/)[0]);
      
          for (const [date, subject, description, homework] of curriculumData) {
            dataArray.push({
              date: date, // You can set the desired date here
              details: [
                {
                  subject: subject,
                  title: "Lecture",
                  description: description,
                  button: "Start",
                  destination: "/resources/homework",
                },
                {
                  subject: subject,
                  title: "Homework",
                  description: homework,
                  button: "Start",
                  destination: "/resources/homework",
                },
              ],
            });
          }
      
          console.log(dataArray);
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
      
          const gen_list = list.map((item) => {
            // extract the stuff to build query
            var query =
              "The student is in grade " + String(user.educationLevel) + ". ";
            var date = item.date;
            var subject_type = item.subject.toLowerCase();
            query += item.description;
      
            console.log(subject_type);
            console.log(query);
      
            // call the query
            fetch("http://127.0.0.1:12000/api/query", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                input: query,
                type: subject_type,
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
                handleResult(apiResponse);
              })
              .catch((error) => {
                console.error("Error");
              });
          });
      
          // Extract a list of unique subjects
          dateLists = [...new Set(list.map((item) => item.date))];
        } catch (error) {
          console.error("Error:", error);
        }        

        };

  const [selected, setSelected] = useState(null);

  const toggle = (id) => {
    setSelected(selected === id ? null : id);
  };

  const navigate = useNavigate();

  return (
    <div className="MySchedule">
      <div>
        <h1>My Resources</h1>
        <button onClick={handleClick}>Regenerate curriculum</button>
        <div className="accordion">
          {dataArray.map((block, blockIndex) => (
            <div key={blockIndex}>
              <h2>{block.date}</h2>
              {block.details.map((item, itemIndex) => {
                // Create a unique ID for each item
                const id = `${blockIndex}-${itemIndex}`;
                return (
                  <div className="item" key={id}>
                    <div className="title" onClick={() => toggle(id)}>
                      <h3>{item.subject}</h3>
                      <h4>{item.title}</h4>
                      <span>{selected === id ? "-" : "+"}</span>
                    </div>
                    {selected === id && (
                      <div className="contentshow">
                        <p>{item.description}</p>
                        <button onClick={() => navigate(item.destination)}>
                          {item.button}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const data = [
  {
    date: "Monday, Nov 4, 2023",
    details: [
      {
        subject: "Reading & Writing",
        title: "Lecture",
        description: "Something working Is this actually",
        button: "Start",
        destination: "/resources/homework",
      },
      {
        subject: "Mathematics",
        title: "Homework",
        description: "Creative Writing - Imagine you find a magic lamp...",
        button: "Start",
        destination: "/resources/homework",
      },
    ],
  },
  {
    date: "Monday, Nov 4, 2023",
    details: [
      {
        subject: "Reading & Writing",
        title: "Lecture",
        description: "Something working Is this actually",
        button: "Start",
        destination: "/resources/homework",
      },
      {
        subject: "Mathematics",
        title: "Homework",
        description: "Creative Writing - Imagine you find a magic lamp...",
        button: "Start",
        destination: "/resources/homework",
      },
    ],
  },
];

export default MyResources;
