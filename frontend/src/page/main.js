import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
function Main() {
  const navigate = useNavigate(); // Initialize navigate
  const [inputValue1, setInputValue1] = useState("");
  const [savedValue1, setSavedValue1] = useState("");
  const [musicList, setMusicList] = useState([]);
  const Move_Nextpage = () => {
    fetch("http://localhost:8000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue1 }), // 입력 값을 JSON 형식으로 변환하여 전송합니다.
    })
      .then((response) => response.json())
      .then((data) => {
        // 서버로부터의 응답을 처리합니다.
        console.log("서버 응답:", data);
        if (data.message === "true") {
          setMusicList(data.music_list);
          if (data.music_list.length > 0) {
            navigate("/audiolist");
          }
        }
      })
      .catch((error) => {
        console.error("오류:", error);
      });
  };
  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  // 버튼을 클릭할 때 호출되는 함수
  const handleSave1 = () => {
    setSavedValue1(inputValue1);
    console.log(inputValue1);
  };

  return (
    <div className="white-box-main">
      <div className="App">
        <div className="black-nav">
          <h1>Combine Favorite Music</h1>
        </div>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button class="btn-hover color-2">Go to YouTube</button>
        </a>
        <h1>Type the url of youtube music list</h1>
        <input
          type="text"
          value={inputValue1}
          onChange={handleInputChange1}
          placeholder="Enter something"
          style={{
            background: "#eee",
            padding: "16px",
            margin: "8px 0",
            width: "300px",
            border: "0",
            outline: "none",
            borderRadius: "20px",
            boxShadow: "inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff",
          }}
        />
        <div>
          <br />
        </div>
        <button class="custom-btn btn-5" onClick={handleSave1}>
          Save
        </button>
        <div>
          <br /> <br />
        </div>
        <div className="Go next">
          <button onClick={Move_Nextpage} class="btn-hover color-11">
            Go Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
