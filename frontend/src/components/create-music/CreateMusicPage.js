import { useEffect, useState } from "react";
import { useYoutubeMusicStore } from "../../store/useMusicStore";
import { classNames } from "../../utils/className";
import { AudioController } from "./AudioController";
import Lottie from "react-lottie";
import * as generateLoading from "../../lottie/generate_loading.json";
import {
  MusicalNoteIcon,
  PaintBrushIcon,
  ScissorsIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import styled, { keyframes } from "styled-components";

export const CreateMusicPage = () => {
  const [step, setStep] = useState({
    step: 1,
    status: "default", // loading or default
  });
  const [mainMusic, setMainMusic] = useState("");
  const [subMusic, setSubMusic] = useState("");

  const [mainMusicFile, setMainMusicFile] = useState(null);
  const [subMusicFile, setSubMusicFile] = useState(null);

  const [outputMusicFile, setOutputMusicFile] = useState(null);

  const [cropStart, setCropStart] = useState("");
  const { youtubeMusicList, setMusicList } = useYoutubeMusicStore();

  useEffect(() => {
    fetch("http://localhost:8000/next")
      .then((response) => response.json())
      .then((data) => {
        if (data.music_list !== "'list'") setMusicList(data.music_list);
        console.log(data.music_list);
        console.log("Received music list:", data.music_list);
      })
      .catch((error) => {
        console.error("Error fetching data from backend:", error);
        // 이때 경고를 띄워주세용
      });
  }, []);

  const handleClickClearSelect = () => {
    setMainMusic("");
    setSubMusic("");
  };

  const handleClickReset = () => {
    setStep({ step: 1, status: "default" });
    setMainMusic("");
    setSubMusic("");
  };

  const handleClickGenerate = async () => {
    try {
      if (mainMusic && subMusic) {
        setStep({ step: 3, status: "loading" });
        // Main Music과 Sub Music이 모두 선택되었는지 확인
        // 클라이언트가 백엔드에게 요청을 보내는 부분입니다.
        const response = await fetch("http://localhost:8000/Mix_music", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MainMusic: mainMusic,
            SubMusic: subMusic,
            inputValue1: cropStart,
          }),
        }).then((response) => response.blob());
        const output_music_url = URL.createObjectURL(response);
        setOutputMusicFile(output_music_url);
        // .then((response) => response.json())
        // .then((data) => {
        //   console.log(data.message);
        // });
        setStep({ step: 3, status: "default" });
      } else {
        console.error("Main Music and Sub Music must be selected."); // Main Music과 Sub Music이 선택되지 않은 경우 에러 출력
      }
      // setShowPopup(true); // 항상 팝업창을 표시
    } catch (error) {
      console.error("Error saving selection:", error);
      setStep({ step: 2, status: "default" });
    } finally {
    }
  };

  const handleClickSelect = async () => {
    try {
      if (mainMusic && subMusic) {
        setStep({ step: 2, status: "loading" });
        // Main Music과 Sub Music이 모두 선택되었는지 확인
        // 클라이언트가 백엔드에게 요청을 보내는 부분입니다.
        const response = await fetch("http://localhost:8000/select", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ MainMusic: mainMusic, SubMusic: subMusic }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("data.main_path", data.main_path);
          });

        const main_music = await fetch("http://localhost:8000/music/main", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.blob());
        console.log(main_music);
        const main_music_url = URL.createObjectURL(main_music);
        setMainMusicFile(main_music_url);
        const sub_music = await fetch("http://localhost:8000/music/sub", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.blob());

        if (sub_music) {
          const sub_music_url = URL.createObjectURL(sub_music);

          console.log(sub_music);
          setSubMusicFile(sub_music_url);
        }
        setStep({ step: 2, status: "default" });
      } else {
        console.error("Main Music and Sub Music must be selected."); // Main Music과 Sub Music이 선택되지 않은 경우 에러 출력
        setStep({ step: 1, status: "default" });
      }
    } catch (error) {
      console.error("Error saving selection:", error);
      setStep({ step: 1, status: "default" });
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(outputMusicFile, {
        responseType: "blob", // 바이너리 데이터로 응답받기 위해 설정
      });
      // 파일 다운로드를 위한 링크 생성
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Output.wav"); // 다운로드할 파일명 설정
      document.body.appendChild(link);
      link.click();
      // 다운로드 후 링크 제거
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("파일 다운로드 오류:", error);
    }
  };

  return (
    <div className="w-full h-full bg-gray-950 flex flex-col relative">
      <div className="m-4 flex flex-col gap-8  h-full w-fill">
        <div
          className={classNames(
            step.step === 1 ? "border-indigo-500 border-2" : "border-none",
            "relative flex-1 w-full bg-gray-700 h-full p-4 rounded-lg"
          )}
        >
          {step.step === 1 && (
            <div className="absolute right-0 top-0 flex p-4 gap-4">
              <button
                className="text-base  text-white border-white border rounded-md pl-4 pr-4 pt-1 pb-1 hover:opacity-80 active:opacity-60 m-0"
                onClick={handleClickClearSelect}
              >
                Clear All
              </button>
              <button
                className="text-base text-white bg-indigo-500 border border-none rounded-md pl-4 pr-4 pt-1 pb-1 hover:opacity-80 active:opacity-60 m-0"
                onClick={handleClickSelect}
              >
                Create
              </button>
            </div>
          )}
          <div className="flex flex-row gap-4 items-center mb-4">
            <div className="rounded-lg bg-gray-900 w-fit h-fit p-2 ">
              <MusicalNoteIcon className="w-4 h-4 text-indigo-500" />
            </div>
            <h1 className="text-white">Step 1. 음악 선택하기</h1>
          </div>
          <h2>Select First Music</h2>
          <select
            className="w-full"
            value={mainMusic}
            onChange={(e) => setMainMusic(e.target.value)}
          >
            <option>Choose One</option>
            {youtubeMusicList &&
              youtubeMusicList.map((music, index) => (
                <option key={index} value={music}>
                  {music}
                </option>
              ))}
          </select>
          <h2>Select Second Music</h2>
          <select
            className="w-full"
            value={subMusic}
            onChange={(e) => setSubMusic(e.target.value)}
          >
            <option>Choose One</option>
            {youtubeMusicList &&
              youtubeMusicList.map((music, index) => (
                <option key={index} value={music}>
                  {music}
                </option>
              ))}
          </select>
        </div>
        <div
          className={classNames(
            step.step === 2 ? "border-indigo-500 border-2" : "border-none",
            step.step < 2 ? "opacity-0" : "opacity-100",
            "relative flex-1 w-full bg-gray-700 h-full p-4  rounded-lg transition-opacity"
          )}
        >
          {step.step === 2 && step.status === "default" && (
            <div className="absolute right-0 top-0 flex p-4 gap-4">
              <button
                className="text-base  text-white border-white border rounded-md pl-4 pr-4 pt-1 pb-1 hover:opacity-80 active:opacity-60 m-0"
                onClick={handleClickReset}
              >
                Reset
              </button>
              <button
                className="text-base text-white bg-indigo-500 border border-none rounded-md pl-4 pr-4 pt-1 pb-1 hover:opacity-80 active:opacity-60 m-0"
                onClick={handleClickGenerate}
              >
                Generate
              </button>
            </div>
          )}

          <div className="flex flex-row gap-4 items-center mb-4">
            <div className="rounded-lg bg-gray-900 w-fit h-fit p-2 ">
              {/* <MusicalNoteIcon className="w-4 h-4 text-indigo-500" /> */}
              <ScissorsIcon className="w-4 h-4 text-indigo-500" />
            </div>
            <h1 className="text-white">Step 2. 음악 구간 선택하기</h1>
          </div>
          {step.step === 2 && step.status === "loading" && (
            <div className="flex flex-col justify-center items-center">
              <Lottie
                style={{
                  borderRadius: "20px",
                  boxShadow:
                    "inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff",
                }}
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: generateLoading.default,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={200}
                width={200}
              />
              <div className="overflow-hidden h-6 text-center mt-4 text-indigo-500">
                <LoadingAnimation>
                  영상 생성 중<br />
                  음악 장르 분류 중<br />
                  생성 모델 초기화 중<br />
                  inference
                  <br />
                  생성한 영상 다운로드 중
                </LoadingAnimation>
              </div>
            </div>
          )}

          {((step.step === 2 && step.status === "default") ||
            step.step > 2) && (
            <>
              <AudioController audioSrc={mainMusicFile} />
              <input
                type="text"
                value={cropStart}
                onChange={(e) => setCropStart(e.target.value)}
                placeholder="Ex) 2:10"
                style={{
                  background: "#eee",
                  padding: "16px",
                  margin: "8px 0",
                  width: "300px",
                  border: "0",
                  outline: "none",
                  borderRadius: "20px",
                  boxShadow:
                    "inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff",
                }}
              />
            </>
          )}
        </div>

        <div
          className={classNames(
            step.step === 3 ? "border-indigo-500 border-2" : "border-none",
            step.step < 3 ? "invisible" : "",
            "flex-1 w-full bg-gray-700 h-full p-4  rounded-lg"
          )}
        >
          <div className="flex flex-row gap-4 items-center mb-4">
            <div className="rounded-lg bg-gray-900 w-fit h-fit p-2 ">
              {/* <MusicalNoteIcon className="w-4 h-4 text-indigo-500" /> */}
              <PaintBrushIcon className="w-4 h-4 text-indigo-500" />
            </div>
            <h1 className="text-white">Step 3. 음악 생성</h1>
          </div>
          {step.step === 3 && step.status === "loading" && (
            <div className="flex flex-col justify-center items-center">
              <Lottie
                style={{
                  borderRadius: "20px",
                  boxShadow:
                    "inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff",
                }}
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: generateLoading.default,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={200}
                width={200}
              />
              <div className="overflow-hidden h-6 text-center mt-4 text-indigo-500">
                <LoadingAnimation>
                  영상 생성 중<br />
                  음악 장르 분류 중<br />
                  생성 모델 초기화 중<br />
                  inference
                  <br />
                  생성한 영상 다운로드 중
                </LoadingAnimation>
              </div>
            </div>
          )}

          {step.step === 3 && step.status === "default" && (
            <div className="bg-gray-700">
              <AudioController audioSrc={outputMusicFile} />
              <button
                className="text-base text-white bg-indigo-500 border border-none rounded-md pl-4 pr-4 pt-1 pb-1 hover:opacity-80 active:opacity-60 m-0"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          )}
        </div>

        {/* <h1 className="text-white">Youtube Music List</h1>
        <h2 className="text-white"> Select Main Music</h2> */}
      </div>
    </div>
  );
};

const LoadingAnimationKeyframes = keyframes`
  0% { top: 0px }
  18% { top: 0px }
  20% { top: -1.5rem }
  38% { top: -1.5rem }
  40% { top: -3rem }
  58% { top: -3rem }
  60% { top: -4.5rem }
  78% { top: -4.5rem }
  80% { top: -6rem }
  98% { top: -6rem }
  100% { top: -7.5rem }
`;
const LoadingAnimation = styled.div`
  display: inline-block;
  position: relative;
  white-space: nowrap;
  top: 0;
  left: 0;

  animation: ${LoadingAnimationKeyframes} 60s infinite;
  animation-delay: 0s;
`;
