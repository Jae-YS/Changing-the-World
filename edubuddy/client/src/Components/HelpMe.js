import React, { useState, useEffect, useRef } from 'react';
import bot from '../assets/bot.svg'
import user from '../assets/user.svg'
import '../App.css'; // Make sure you have this CSS file

const ChatApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom every time chats update
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = inputValue.trim();
    if (!message) return;

    // Add user's message
    const userChat = { id: generateUniqueID(), text: message, isAi: false };
    setChats([...chats, userChat]);

    setInputValue(''); // Reset input

    // Add AI's response placeholder
    const aiPlaceholder = { id: generateUniqueID(), text: '...', isAi: true };
    setChats(currentChats => [...currentChats, aiPlaceholder]);

    try {
      const response = await fetch('http://localhost:10000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: message,
            type: "help"
          }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = data.bot.trim();
        // Update the AI's chat with the actual response
        updateAiChat(aiPlaceholder.id, botMessage);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      updateAiChat(aiPlaceholder.id, 'Something went wrong: ' + error.message);
    }
  };

  const updateAiChat = (id, text) => {
    setChats(currentChats =>
      currentChats.map(chat =>
        chat.id === id ? { ...chat, text } : chat
      )
    );
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const generateUniqueID = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  };

  return (
    <div id="app">
      <div id="chat_container" ref={chatContainerRef}>
        {chats.map(chat => (
          <div key={chat.id} className={`wrapper ${chat.isAi ? 'ai' : ''}`}>
            <div className="chat">
              <div className="profile">
                <img src={chat.isAi ? bot : user} alt={chat.isAi ? 'bot' : 'user'} />
              </div>
              <div className="message">{chat.text}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="prompt"
          rows="1"
          placeholder="Type Your Question Here"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">
          <img src="assets/send.svg" alt="Send" />
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
