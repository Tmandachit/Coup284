import React, { useState, useEffect } from "react";
import socket from "../../socket.js";
import "./Lobby.css";

function Lobby() {
  const [username, setUsername] = useState("");
  const [lobby, setLobby] = useState("");
  const [lobbyMembers, setLobbyMembers] = useState([]);

  useEffect(() => {
    socket.on("lobby-update", (members) => {
      console.log("Lobby members updated:", members);
      setLobbyMembers(members);
    });

    return () => {
      socket.off("lobby-update");
    };
  }, []);

  const joinLobby = () => {
    if (username.trim() && lobby.trim()) {
      socket.connect();
      socket.emit("join-lobby", { username, lobby });
      console.log(`${username} joining lobby: ${lobby}`);
    }
  };

  return (
    <div className="lobbyContainer">
      <h2>Lobby System</h2>
      
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter lobby name"
          value={lobby}
          onChange={(e) => setLobby(e.target.value)}
        />
        <button className="lobbyButton" onClick={joinLobby}>Join Lobby</button>
      </div>

      {lobby && (
        <div className="lobbyMembers">
          <h3>Members in {lobby}:</h3>
          <ul>
            {lobbyMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Lobby;
