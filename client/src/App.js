import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import HomePage from "./Components/Home/HomePage";
import CreateLobby from "./Components/CreateLobby/CreateLobby";

function App() {
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);
  const roomInputRef = useRef(null);
  const formRef = useRef(null);
  const joinRoomButtonRef = useRef(null);
  const messageContainerRef = useRef(null);

  const socket = io("http://localhost:5002");

  useEffect(() => {
    const form = formRef.current;
    const joinRoomButton = joinRoomButtonRef.current;
    const messageInput = messageInputRef.current;
    const roomInput = roomInputRef.current;

    if (!form || !joinRoomButton || !messageInput || !roomInput) return;

    const handleFormSubmit = (e) => {
      e.preventDefault();
      const message = messageInput.value.trim();
      const room = roomInput.value.trim();

      if (!message) return;
      displayMessage(message);

      messageInput.value = "";
    };

    const handleJoinRoom = () => {
      const room = roomInput.value.trim();
      console.log(`Joining room: ${room}`);
      // Add socket logic to join the room here
    };

    form.addEventListener("submit", handleFormSubmit);
    joinRoomButton.addEventListener("click", handleJoinRoom);

    return () => {
      form.removeEventListener("submit", handleFormSubmit);
      joinRoomButton.removeEventListener("click", handleJoinRoom);
    };
  }, []);

  function displayMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  return (
    <div>
      {/* 
        Pages
      */}
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Login" element={<LoginSignup />} />
          <Route path="/Create" element={<CreateLobby />} />
        </Routes>
      </BrowserRouter>

      {/* 
        Chat footer
      */}
      <div className="footer">
        <div id="message-container" ref={messageContainerRef}>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <form id="form" ref={formRef}>
          <label htmlFor="message-input">Message</label>
          <input type="text" id="message-input" ref={messageInputRef} />
          <button type="submit" id="send-button">Send</button>
          <label htmlFor="room-input">Room</label>
          <input type="text" id="room-input" ref={roomInputRef} />
          <button type="button" id="room-button" ref={joinRoomButtonRef}>Join</button>
        </form>
      </div>
    </div>
  );
}

export default App;
