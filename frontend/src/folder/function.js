import { Select, Button } from "./styled.js";
import React, { useState } from "react";

export const SelectBox = ({ options, defaultValue, onFileSelected }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue.value);
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleClick = () => {
    onFileSelected(selectedValue);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Select onChange={handleChange} value={selectedValue}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            
          >
            {option.name}
          </option>
        ))}
      </Select>
      <Button onClick={handleClick}>Select Music</Button>
    </div>
  );
};
export const MyComponent = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <Button onClick={handleClick}>Mix music</Button>
      <br></br>
    </div>
  );
};



