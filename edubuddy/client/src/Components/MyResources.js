import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'; // Assuming you are using Heroicons or similar

// A single resource item component
const ResourceItem = ({ subject, type, description }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage if the item is expanded or not

  return (
    <div className="resource-item">
      <div className="resource-item-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{subject}</h3>
        
        <p>{type}</p>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </div>
      {isOpen && (
        <div className="resource-item-content">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

// The MyResources component
const MyResources = () => {
  // Sample data structure for resources
  const resourcesData = [
    {
      date: "Monday, Nov 4, 2023",
      details: [
        { subject: "Reading & Writing", type: "Homework", description: "Description for Reading & Writing Homework" },
        { subject: "Science", type: "Creative Writing", description: "Creative Writing - Imagine you find a magic lamp..." },
        // ... other items
      ],
    },
    // ... other days
  ];

  return (
    <div className="my-resources">
      {resourcesData.map((day, dayIndex) => (
        <div key={day.date} className="day-resources">
          <h2>{day.date}</h2>
          {day.details.map((item, itemIndex) => (
            <ResourceItem
              key={`${dayIndex}-${itemIndex}`}
              subject={item.subject}
              type={item.type}
              description={item.description}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyResources;
