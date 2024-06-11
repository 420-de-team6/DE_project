import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import Slider from "../../page/slider/Slider";

export const AudioController = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const [audioPercentage, setAudioPercentage] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);

  return (
    <div className=" w-full bg-gray-800 p-4 rounded-lg">
      <div className="flex flex-row content-between justify-center w-full pb-4">
        {!audioPlaying ? (
          <PlayIcon
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => {
              audioRef.current.play();
            }}
          />
        ) : (
          <PauseIcon
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => {
              audioRef.current.pause();
            }}
          />
        )}
      </div>
      <Slider
        percentage={audioPercentage}
        onChange={(e) => {
          const audio = audioRef.current;
          if (audio) {
            audio.currentTime = (audio.duration / 100) * e.target.value;
            setAudioPercentage(e.target.value);
            setAudioCurrentTime(parseInt(audio.currentTime));
          }
        }}
      />
      <audio
        ref={audioRef}
        onPlay={() => setAudioPlaying(true)}
        onPause={() => setAudioPlaying(false)}
        onTimeUpdate={(e) => {
          const audio = e.target;
          setAudioPercentage((audio.currentTime / audio.duration) * 100);
          setAudioCurrentTime(parseInt(audio.currentTime));
        }}
        onLoadedMetadata={(e) => {
          setAudioDuration(e.target.duration);
          setAudioPercentage(0);
          setAudioPlaying(false);
          setAudioCurrentTime(0);
        }}
        src={audioSrc}
      />
      <div className=" flex justify-center text-white">
        {String(parseInt(audioCurrentTime / 60)).padStart(2, "0")}:
        {String(parseInt(audioCurrentTime % 60)).padStart(2, "0")}/
        {String(parseInt(audioDuration / 60)).padStart(2, "0")}:
        {String(parseInt(audioDuration % 60)).padStart(2, "0")}
      </div>
    </div>
  );
};
