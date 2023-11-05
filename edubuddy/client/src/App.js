import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GettingStarted from "./Components/GettingStarted.js";
import HelloWorld from "./Components/HelloWorld.js"
import MyCurriculum from './Components/MyCurriculum.js';
import MySchedule from "./Components/MySchedule.js"
import MyResources from "./Components/MyResources.js"
import Navigation from './Components/Navigation.js';
import Homework from "./Components/Homework.js"
import HelpMe from "./Components/HelpMe.js";


function App() {
  return (
    <Router>
      <Navigation></Navigation>
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
