import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GettingStarted from "./Components/GettingStarted.js";
import MyCurriculum from './Components/MyCurriculum.js';
import MySchedule from "./Components/MySchedule.js"
import MyResources from "./Components/MyResources.js"
import Navigation from './Components/Navigation.js';
import Homework from "./Components/Homework.js"
import HelpMe from "./Components/HelpMe.js";



function App() {
  const [userSchedule, setUserSchedule] = useState("");
  const [userCurriculum, setUserCurriculum] = useState("");
  const [user, setUser] = useState({});

  // const extractEducationLevel = (educationLevel) => {
  //   var grade = educationLevel.replace(/[^0-9.]/g, "");
  //   var edLevel = parseFloat(grade);
  //   while (!isNaN(edLevel)) {
  //     grade = educationLevel.replace(/[^0-9.]/g, "");
  //     edLevel = parseFloat(grade);
  //   }
  //   return edLevel;
  // };

  // Define a function to update the user data
  const updateUser = async (userData, apiResponse) => {
    try {
      // Parse the educationLevel and update userData
      userData.educationLevel = parseFloat(
        userData.educationLevel.replace(/[^0-9.]/g, "")
      );

      // Assuming setUser and setUserSchedule return promises, await them
      await Promise.all([setUser(userData), setUserSchedule(apiResponse)]);

      // Assuming user and userSchedule are defined elsewhere
      console.log(user);
      console.log(userSchedule);

      // Generate curriculum with the updated educationLevel
      generateCurriculum(userData.educationLevel);
      console.log(userCurriculum);
    } catch (error) {
      console.error("Error in updateUser: ", error);
    }
  };

  const generateCurriculum = (userEducationLevel) => {
    console.log("here");
    fetch("http://127.0.0.1:12000/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: userEducationLevel,
        type: "curriculum",
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
        setUserCurriculum(apiResponse);
      })
      .catch((error) => {
        console.error("Error");
      });
  };

  return (
    <Router>
      <Navigation userSchedule={userSchedule}></Navigation>
      <Routes>
        <Route path="/" element={<GettingStarted />} exact />
        <Route path="/schedule" element={<MySchedule />} />
        <Route path="/curriculum" element={<MyCurriculum />} />
        <Route path="/resources" element={<MyResources />} />
        <Route path="/resources/homework" element={<Homework />} />
        <Route path="/help-me" element={<HelpMe />}/>
      </Routes>
    </Router>
  );
}

export default App;
