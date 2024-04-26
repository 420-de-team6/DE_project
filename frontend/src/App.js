import React, { useState, useRef, useEffect } from "react"; // Import React
import styled from "styled-components";
import './App.css';

export const Select = styled.select`
	margin: 0;
	min-width: 0;
	display: block;
	width: 100%;
	padding: 8px 8px;
	font-size: inherit;
	line-height: inherit;
	border: 1px solid;
	border-radius: 4px;
	color: inherit;
	background-color: transparent;
	&:focus {
		border-color: red;
	}
`;
const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

const SelectBox = ({ options, defaultValue, onFileSelected }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Select onChange={handleChange}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={defaultValue === option.value}
          >
            {option.name}
          </option>
        ))}
      </Select>
      <Button onClick={onFileSelected}>Play Selected Music</Button>
    </div>
  );
};

function App() {
  const first = [
    { value: "./musicfile/951. 꿀벌브금.mp3", name: "꿀벌브금" },
    { value: "./musicfile/955. Je Taime Montmartre.mp3", name: "Je Taime Montmartre" },
    { value: "./musicfile/Love Game.mp3", name: "Love Game" },
  ];

  const [selectedFile, setSelectedFile] = useState(first[0].value);

  const handleFileSelected = () => {
    // Logic to open file manager and select new audio file
    // For simplicity, we'll just select the first file in the list
    setSelectedFile(first[0].value);
  };
  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);
  return (
    <div className="App">
      <div className="black-nav"> 
        <h1>Combine Favorite Music</h1>
      </div>
      <h4>Choose first music you want</h4>
      <div className='first_music_select'>
        <SelectBox options={first} defaultValue={first[0].value} onFileSelected={handleFileSelected} />
        <audio src={selectedFile} controls />
      </div>
      <h4>Choose second music you want</h4>
      <div className='first_music_select'>
        <SelectBox options={first} defaultValue={first[0].value} onFileSelected={handleFileSelected} />
        <audio src={selectedFile} controls />
      </div>
      
    </div>
  );
}

export default App;