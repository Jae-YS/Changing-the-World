import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const ScheduleItem = ({ item, id, isSelected, onToggle, onNavigate }) => {
    return (
      <div className='item'>
        <div className="title" onClick={() => onToggle(id)}>
          <h3>{item.subject}</h3>
          <h4>{item.title}</h4>
          <span>{isSelected ? '-' : '+'}</span>
        </div>  
        {isSelected && (
          <div className='contentshow'>
            <p>{item.description}</p>
            <button onClick={() => onNavigate(item.destination)}>
              {item.button}
            </button>
          </div>
        )}
      </div>
    );
  };


  function MyResources(){
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const toggle = (id) => {
        setSelected(selected === id ? null : id);
    };

    return (
        <div className="MySchedule">
            <h1>My Resources</h1>
            <div className='accordion'>
                {data.map((block, blockIndex) => (
                    <div key={blockIndex}>
                        <h2>{block.date}</h2>
                        {block.details.map((item, itemIndex) => {
                            const id = `${blockIndex}-${itemIndex}`;
                            return (
                                <ScheduleItem
                                    key={id}
                                    item={item}
                                    id={id}
                                    isSelected={selected === id}
                                    onToggle={toggle}
                                    onNavigate={navigate}
                                />
                            );
                        })}
                    </div>
                ))}
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
                description: 'Something working Is this actually',
                button: 'Start',
                destination: '/resources/homework'
            },
            {   subject: "Mathematics", 
                title: "Homework", 
                description: "Creative Writing - Imagine you find a magic lamp...", 
                button: "Start",
                destination: '/resources/homework'},
        ]
    },
    {
        date: "Monday, Nov 4, 2023",
        details: [
            {
                subject: "Reading & Writing", 
                title: "Lecture",
                description: 'Something working Is this actually',
                button: 'Start',
                destination: '/resources/homework'
            },
            {   subject: "Mathematics", 
                title: "Homework", 
                description: "Creative Writing - Imagine you find a magic lamp...", 
                button: "Start",
                destination: '/resources/homework' },
        ]
    }
]

export default MyResources;
