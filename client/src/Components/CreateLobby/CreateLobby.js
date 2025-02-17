import React, { Component } from 'react';
import './CreateLobby.css';

class HomePage extends Component {
  render() {
    return (
      <div className="homeContainer">
        <h1>Create a lobby</h1>
        <p>Please select your lobby name below:</p>
        <input 
          type="text" 
          className="lobbyNameInput" 
          placeholder="Enter lobby name" 
        />
      </div>
    );
  }
}

export default HomePage;
