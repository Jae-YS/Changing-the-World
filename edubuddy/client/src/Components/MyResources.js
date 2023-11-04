import React, { useState } from 'react';

function MyResources(){
    const [selected, setSelected] = useState(null)


    const toggle = (id) => {
        setSelected(selected === id ? null : id);
    }

    return (
        <div>
            <h1>My Curriculum</h1>
            <div className='accordion'>
                {data.map((block, blockIndex) => (
                    <div key={blockIndex}>
                        <h2>{block.date}</h2>
                        {block.details.map((item, itemIndex) => {
                            // Create a unique ID for each item
                            const id = `${blockIndex}-${itemIndex}`;
                            return (
                                <div className='item' key={id}>
                                    <div className="title" onClick={() => toggle(id)}>
                                        <h3>{item.title}</h3>
                                        <span>{selected === id ? '-' : '+'}</span>
                                    </div>  
                                    {selected === id && (
                                        <div className='contentshow'>
                                            <p>{item.description}</p>
                                            <button>{item.button}</button>
                                        </div>
                                    )}
                                </div>
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
            title: "Reading",
            description: 'Something working Is this actually',
            button: 'Start'
        },
        {   title: "Science", 
            description: "Creative Writing - Imagine you find a magic lamp...", 
            button: "Start" },
        ]
        
    },
    {
        date: "Monday, Nov 4, 2023",
        details: [
            {
                title: "Reading",
                description: 'Something working Is this actually',
                button: 'Start'
            },
            {   title: "Science", 
                description: "Creative Writing - Imagine you find a magic lamp...", 
                button: "Start" },
        ]
    }
]

export default MyResources;
