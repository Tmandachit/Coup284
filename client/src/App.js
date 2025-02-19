import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import socket from "./socket"; 

// Pages
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import HomePage from "./Components/Home/HomePage";
import CreateLobby from "./Components/CreateLobby/CreateLobby";
import Lobby from "./Components/Lobby/Lobby"; 

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Login" element={<LoginSignup />} />
          <Route path="/Create" element={<CreateLobby />} />
          <Route path="/Join" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
