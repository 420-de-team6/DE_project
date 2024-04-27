import React, { useState, useEffect } from "react"; // Import React
import {MyComponent, SelectBox} from "./folder/function.js";
import './App.css';
import Love_Game from "./musicfile/Love Game.mp3";
import 꿀벌브금 from "./musicfile/951. 꿀벌브금.mp3";
import Je_Taime_Montmartre from "./musicfile/955. Je Taime Montmartre.mp3";

function App() {
  const first = [
    { value: 꿀벌브금, name: "꿀벌브금" },
    { value: Je_Taime_Montmartre, name: "Je Taime Montmartre" },
    { value: Love_Game, name: "Love Game" },
  ];

  const [selectedFile1, setSelectedFile1] = useState(first[0].value);
  const [selectedFile2, setSelectedFile2] = useState(first[0].value);


  useEffect(() => {
    console.log("useEffect1", selectedFile1);
  }, [selectedFile1]);

  useEffect(() => {
    console.log("useEffect2", selectedFile2);
  }, [selectedFile2]); // 새로운 useEffect 추가

  const handleMixMusic = () => {
    // 선택한 오디오 파일을 백엔드로 전송
    console.log("check audio file", {selectedFile1, selectedFile2});
    fetch('http://localhost:8000/mix_music', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedFile1, selectedFile2 }), // 선택한 오디오 파일을 JSON 형식으로 전송
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };
  return (
    <div className="App">
      <div className="black-nav"> 
        <h1>Combine Favorite Music</h1>
      </div>
      <h4>Choose first music you want</h4>
      <div className='first_music_select'>
        <SelectBox options={first} defaultValue={first[0]} onFileSelected={setSelectedFile1} />
        <audio src={selectedFile1} controls />
      </div>
      <h4>Choose second music you want</h4>
      <div className='second_music_select'>
        <SelectBox options={first} defaultValue={first[0]} onFileSelected={setSelectedFile2} />
        <audio src={selectedFile2} controls />
      </div>
      <div className='Mix_music'>
        {/* <MyComponent/> */}
        <button onClick={handleMixMusic}>Mix Music</button> {/* 버튼 클릭 시 handleMixMusic 함수 호출 */}
        <h4>Result</h4>
        <audio src controls />
      </div>
      
    </div>
  );
}

export default App;