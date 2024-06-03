import React from "react"; // Import React
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Main from './page/main.js';
import AudioList from "./page/AudioList.js";
import Loading from "./page/loading.js";
import CreatMusic from "./page/creat_music.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/audiolist" element={<AudioList/>} />
        <Route path="/audiolist/loading" element={<Loading/>} />
        <Route path="/creat-music" element={<CreatMusic/>} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;