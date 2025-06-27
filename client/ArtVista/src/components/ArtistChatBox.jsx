import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const ArtistChatBox = ({ artistId, sender = 'user' }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.emit('joinRoom', artistId);

    axios.get(`http://localhost:5000/api/message/${artistId}`)
      .then(res => setChat(res.data));

    socket.on('newMessage', (msg) => {
      setChat(prev => [...prev, msg]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [artistId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const sendMessage = () => {
    if (!message) return;
    axios.post('http://localhost:5000/api/message', {
      artistId,
      sender,
      text: message
    });
    setMessage('');
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-white text-xl font-semibold mb-3">Chat with Artist</h2>
      <div className="h-80 overflow-y-auto bg-gray-900 p-4 rounded mb-4 space-y-2">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === sender ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-xl text-sm shadow-md ${
                msg.sender === sender
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-700 text-white rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-[10px] text-gray-300 mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-700 text-white"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default ArtistChatBox;