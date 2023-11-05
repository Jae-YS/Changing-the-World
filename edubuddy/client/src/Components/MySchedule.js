import React, { useEffect } from "react";
import "../App.css";

const ScheduleItem = ({ event }) => {
  return (
    <div className="schedule-item">
      {event.time && <h3>{event.time}</h3>}
      {event.title && <strong>{event.title}</strong>}
      <p>{event.description}</p>
    </div>
  );
};

const DailySchedule = ({ day }) => {
  return (
    <div className="daily-schedule">
      <h2>{day.date}</h2>
      {day.events.map((event, index) => (
        <ScheduleItem key={index} event={event} />
      ))}
    </div>
  );
};

const MySchedule = ({ userSchedule }) => {
  console.log(userSchedule);
  return (
    <div className="MySchedule">
      <div className="schedule-page">
        <h1>My Schedule</h1>
        {scheduleData.map((day, index) => (
          <DailySchedule key={index} day={day} />
        ))}
      </div>
    </div>
  );
};

const scheduleData = [
  {
    date: "Monday, Nov 4, 2023",
    events: [
      {
        time: "4:30 PM - 5:00 PM",
        title: "Snack and Break Time",
        description:
          "Time to relax and have a healthy snack to recharge after a busy day.",
      },
      {
        time: "5:00 PM - 5:30 PM",
        title: "Reading & Discussion",
        description:
          'Read the assigned short story "The Lost Kitten" aloud and discuss the characters and setting.',
      },
      {
        time: "Homework: Luna’s Story",
        description:
          "Draw a picture of the story's main character, Luna, in its setting. Write two sentences about what Luna did in the story. Due tomorrow.",
      },
    ],
  },
];

export default MySchedule;
