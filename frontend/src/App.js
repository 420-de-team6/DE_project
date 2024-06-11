import React from "react"; // Import React
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./page/main.js";
import AudioList from "./page/AudioList.js";
import Loading from "./page/loading.js";
import CreatMusic from "./page/creat_music.js";
import { Layout } from "./components/layout/Layout.js";
import { FindMusicPage } from "./components/find-music/FindMusicPage.js";
import { CreateMusicPage } from "./components/create-music/CreateMusicPage.js";
import { HomePage } from "./components/home/HomePage.js";
function App() {
  return (
    <>
      <link href="./output.css" rel="stylesheet" />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/view-music" element={<FindMusicPage />} />
            <Route path="/create-music" element={<CreateMusicPage />} />
            {/* <Route path="/audiolist" element={<AudioList />} />
            <Route path="/audiolist/loading" element={<Loading />} />
            <Route path="/creat-music" element={<CreatMusic />} /> */}
          </Route>
          {/* Main 
          youtube 재생목록 link 받음
        */}
          {/* 

         */}
          {/* Recommended 
         현재 만들어진 노래 리스트
         누르면 우측 사이드에서 장르 선택 가능
         선택하면 아래에서 노래 틀어짐
        */}
          {/* Mixing 
          
        */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
