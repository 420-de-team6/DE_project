import '../App.css';
import React, { useState, useRef, useEffect } from 'react';
import Slider from './slider/Slider'
import ControlPanel from './controls/ControlPanel'
import axios from 'axios';
function AudioList() {
  // 오디오 설정
  //1
  const [percentage1, setPercentage1] = useState(0)
  const [isPlaying1, setIsPlaying1] = useState(false)
  const [duration1, setDuration1] = useState(0)
  const [currentTime1, setCurrentTime1] = useState(0)

  const audioRef1 = useRef()

  const [showPopup, setShowPopup] = useState(false);
  //2
  const [percentage2, setPercentage2] = useState(0)
  const [isPlaying2, setIsPlaying2] = useState(false)
  const [duration2, setDuration2] = useState(0)
  const [currentTime2, setCurrentTime2] = useState(0)

  const audioRef2 = useRef()
 //3
  const [percentage3, setPercentage3] = useState(0)
  const [isPlaying3, setIsPlaying3] = useState(false)
  const [duration3, setDuration3] = useState(0)
  const [currentTime3, setCurrentTime3] = useState(0)

  const audioRef3 = useRef()
  const onChange1 = (e) => {
    const audio = audioRef1.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage1(e.target.value)
  }

  const play1 = () => {
    const audio = audioRef1.current
    audio.volume = 0.1

    if (!isPlaying1) {
      setIsPlaying1(true)
      audio.play()
    }

    if (isPlaying1) {
      setIsPlaying1(false)
      audio.pause()
    }
  }

  const getCurrDuration1 = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage1(+percent)
    setCurrentTime1(time.toFixed(2))
  }

  const onChange2 = (e) => {
    const audio = audioRef2.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage2(e.target.value)
  }

  const play2 = () => {
    const audio = audioRef2.current
    audio.volume = 0.1

    if (!isPlaying2) {
      setIsPlaying2(true)
      audio.play()
    }

    if (isPlaying2) {
      setIsPlaying2(false)
      audio.pause()
    }
  }

  const getCurrDuration2 = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage2(+percent)
    setCurrentTime2(time.toFixed(2))
  }

  const onChange3 = (e) => {
    const audio = audioRef3.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage3(e.target.value)
  }

  const play3 = () => {
    const audio = audioRef3.current
    audio.volume = 0.1

    if (!isPlaying3) {
      setIsPlaying3(true)
      audio.play()
    }

    if (isPlaying3) {
      setIsPlaying3(false)
      audio.pause()
    }
  }

  const getCurrDuration3 = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage3(+percent)
    setCurrentTime3(time.toFixed(2))
  }
  /* 선택창 */
  const [MainMusic, setFirstSelect] = useState('');
  const [SubMusic, setSecondSelect] = useState('');
  const handleFirstSelectChange = (event) => {
    setFirstSelect(event.target.value);
    console.log(SubMusic);
  };


  const handleSecondSelectChange = (event) => {
    setSecondSelect(event.target.value);
    console.log(MainMusic);
  };
  /* 선택버튼 */
  const saveSelection = async() => {
    try {
      if (MainMusic && SubMusic) { // Main Music과 Sub Music이 모두 선택되었는지 확인
        // 클라이언트가 백엔드에게 요청을 보내는 부분입니다.
        const response = await fetch('http://localhost:8000/select', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ MainMusic, SubMusic })
        }).then(response => response.json())
        .then(data => {
          console.log("data.main_path",data.main_path)
        })
      } else {
        console.error('Main Music and Sub Music must be selected.'); // Main Music과 Sub Music이 선택되지 않은 경우 에러 출력
      }
    } catch (error) {
      console.error('Error saving selection:', error);
    }
  };
  const Mix_music =  async() => {

    try {
      if (MainMusic && SubMusic) { // Main Music과 Sub Music이 모두 선택되었는지 확인
        // 클라이언트가 백엔드에게 요청을 보내는 부분입니다.
        const response = await fetch('http://localhost:8000/Mix_music', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ MainMusic, SubMusic })
        }).then(response => response.json())
        .then(data => {
          console.log(data.message);
        })
      } else {
        console.error('Main Music and Sub Music must be selected.'); // Main Music과 Sub Music이 선택되지 않은 경우 에러 출력
      }
    } catch (error) {
      console.error('Error saving selection:', error);
    }finally {
      setShowPopup(true); // 항상 팝업창을 표시
    }
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  const [musicList, setMusicList] = useState([]);
  useEffect(() => {
    // 페이지가 처음 마운트될 때 백엔드에서 데이터를 가져오는 요청을 보냅니다.
    fetch('http://localhost:8000/next')
      .then(response => response.json())
      .then(data => {
        setMusicList(data.music_list);
        console.log("Received music list:", data.music_list);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });
  }, []); 
  const subAudioPath = require('../Music/music_file/sub.wav');
  const mainAudioPath = require('../Music/music_file/main.wav');
  const ouputAudioPath = require('../Music/output/output.wav');


  const handleDownload = async () => {
    try {
      const response = await axios.get(ouputAudioPath, {
        responseType: 'blob', // 바이너리 데이터로 응답받기 위해 설정
      });

      // 파일 다운로드를 위한 링크 생성
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Output.wav'); // 다운로드할 파일명 설정
      document.body.appendChild(link);
      link.click();
      
      // 다운로드 후 링크 제거
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('파일 다운로드 오류:', error);
    }};
  return (
    <div className="white-box-audiolist">
    <div>
      <h1> Youtube Music List</h1>
      {/* 옵션들을 파일 이름으로 바꿔야함 */}
      <h2> Select Main Music </h2>
      <select className="select" value={MainMusic} onChange={handleFirstSelectChange}>
        <option value="">Choose one</option>
        {musicList.map((music, index) => (
        <option key={index} value={music}>{music}</option>
        ))}
      </select>

      {/* 두 번째 선택 리스트 */}
      <h2> Select Sub Music </h2>
      <select className="select" value={SubMusic} onChange={handleSecondSelectChange}>
        <option value="">Choose one</option>
           {musicList.map((music, index) => (
           <option key={index} value={music}>{music}</option>
           ))}
      </select>
      <button class="custom-btn btn-5" onClick={saveSelection}>Select</button>
    {/* 선택된 오디오 파일을 재생하는 컴포넌트 */}
    <div className='app-container'>
      <h1>Main_Music</h1>
      <Slider percentage={percentage1} onChange={onChange1} />
      <audio
        ref={audioRef1}
        onTimeUpdate={getCurrDuration1}
        onLoadedData={(e) => {
          setDuration1(e.currentTarget.duration.toFixed(2))
        }}
        src={mainAudioPath}
      ></audio>
      <ControlPanel
        play={play1}
        isPlaying={isPlaying1}
        duration={duration1}
        currentTime={currentTime1}
      />
    </div>
    <div className='app-container'>
      <h1>Sub_Music</h1>
      <Slider percentage={percentage2} onChange={onChange2} />
      <audio
        ref={audioRef2}
        onTimeUpdate={getCurrDuration2}
        onLoadedData={(e) => {
          setDuration2(e.currentTarget.duration.toFixed(2))
        }}
        src={subAudioPath}
      ></audio>
      <ControlPanel
        play={play2}
        isPlaying={isPlaying2}
        duration={duration2}
        currentTime={currentTime2}
      />
    </div>
      <button class="btn-hover color-2" onClick={Mix_music}>Mix</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            <div className='app-container'>
              <h1>Output</h1>
              <Slider percentage={percentage3} onChange={onChange3} />
                <audio
                   ref={audioRef3}
                   onTimeUpdate={getCurrDuration3}
                  onLoadedData={(e) => {
                  setDuration3(e.currentTarget.duration.toFixed(2))
                  }}
                  src={ouputAudioPath}
                ></audio>
              <ControlPanel
                play={play3}
                isPlaying={isPlaying3}
                duration={duration3}
                currentTime={currentTime3}
                />
              <button class="custom-btn btn-5" onClick={handleDownload}>donwload</button>
          </div>
          </div>
        </div>
        
      )}
    </div>
    </div>
  );
}

export default AudioList