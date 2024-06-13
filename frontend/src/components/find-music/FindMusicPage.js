import { useMusicStore } from "../../store/useMusicStore";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { classNames } from "../../utils/className";
import { useEffect, useRef, useState } from "react";
import Slider from "../../page/slider/Slider";

export const FindMusicPage = () => {
  const musicStore = useMusicStore();
  const audioRef = useRef(null);
  const [audioPercentage, setAudioPercentage] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    setAudioPercentage(0);
    setAudioPlaying(false);
  }, [musicStore.currentMusic, musicStore.currentPlayMusic]);

  return (
    <div className="w-full h-full bg-gray-950  flex flex-row relative">
      <div className="w-full m-4">
        <div></div>
        <div className="p-4 text-gray-200 font-bold text-xl">Find Music</div>
        <div className="flex flex-col gap-4 w-full h-[600px] overflow-scroll relative mb-4 ">
          {musicStore.musicList.map((music, idx) => {
            return (
              <div
                key={music.name}
                className="p-4 hover:bg-gray-800 rounded-lg m-0 active:bg-gray-500 flex flex-row  items-center gap-4 w-full cursor-pointer "
                onClick={() => {
                  musicStore.selectMusic(music);
                }}
              >
                <div className="text-gray-300">
                  {(idx + 1).toString().padStart(2, "0")}
                </div>

                <img
                  src={music.img}
                  alt={music.name}
                  className="rounded-lg w-20 h-20 shadow-inner"
                />
                <div className="flex flex-col flex-1">
                  <div className="text-white font-medium">{music.name}</div>
                  <div className="text-gray-400 font-normal text-xs">
                    {music.artist}
                  </div>
                </div>

                <div className="text-gray-400">{music.genre[0]}</div>
              </div>
            );
          })}
        </div>
        <div className=" translate-y-[-5rem] bg-gradient-to-t h-20 w-full to-transparent from-gray-950 " />
      </div>
      <Transition show={!!musicStore.currentMusic}>
        <Dialog
          className="relative z-10"
          onClose={() => musicStore.selectMusic(null)}
        >
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                    <TransitionChild
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute right-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => musicStore.selectMusic(null)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </TransitionChild>
                    <div className="flex h-full flex-col overflow-y-scroll  bg-gray-800 py-6 shadow-xl">
                      <div className="px-4 sm:px-6 mt-20">
                        <DialogTitle className=" text-xl font-semibold leading-6 text-white">
                          Choose Mixing Version
                        </DialogTitle>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6 flex flex-col">
                        <div className="flex-1">
                          <div>
                            {!musicStore?.currentMusic &&
                              [1, 2, 3].map((music, idx) => {
                                return (
                                  <div
                                    key={idx}
                                    className="p-4 hover:bg-gray-800 rounded-lg m-0 active:bg-gray-500 flex flex-row  items-center gap-4 w-full cursor-pointer "
                                    onClick={() => {}}
                                  >
                                    <div className="text-gray-400">
                                      {(idx + 1).toString().padStart(2, "0")}
                                    </div>

                                    <div className="rounded-lg w-20 h-20 bg-gray-400 animate-pulse" />

                                    <div className="flex flex-col flex-1">
                                      <div className="text-white font-medium">
                                        {
                                          <div className="w-20 h-4 bg-gray-400 animate-pulse" />
                                        }
                                      </div>
                                      <div className="text-gray-400 font-normal text-xs">
                                        {
                                          <div className="w-32 h-4 bg-gray-400 animate-pulse" />
                                        }
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}

                            {musicStore.currentMusic?.generateMusics.map(
                              (music, idx) => {
                                return (
                                  <div
                                    key={music}
                                    className={classNames(
                                      musicStore.currentPlayMusic.genre ===
                                        music.genre
                                        ? "bg-gray-700"
                                        : "bg-transparent",
                                      "p-4 hover:bg-gray-800 rounded-lg m-0 active:bg-gray-500 flex flex-row  items-center gap-4 w-full cursor-pointer"
                                    )}
                                    onClick={() => {
                                      musicStore.selectPlayMusic(music);
                                    }}
                                  >
                                    <div className="text-gray-300">
                                      {(idx + 1).toString().padStart(2, "0")}
                                    </div>
                                    <img
                                      src={music.img}
                                      alt={music.prompt}
                                      className="rounded-lg w-20 h-20 shadow-inner"
                                    />
                                    <div className="flex flex-col flex-1">
                                      <div className="text-white font-medium">
                                        {music.genre[0]}
                                      </div>
                                      <div className="text-gray-400 font-normal text-xs">
                                        {music.prompt}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                        <div
                          className={classNames(
                            "relative w-full bg-no-repeat bg-center bg-cover h-[400px] rounded-2xl"
                          )}
                          style={{
                            backgroundImage: `url(${musicStore.currentPlayMusic?.img})`,
                          }}
                        >
                          <div className={"absolute bottom-4 w-full pl-4 pr-4"}>
                            <div className="bg-gray-700 bg-opacity-90 p-4 rounded-xl flex flex-col items-center backdrop-blur-sm">
                              <div className="text-white font-bold text-xl">
                                {musicStore.currentMusic?.name}
                              </div>
                              <div className="text-gray-400 font-normal text-base">
                                {musicStore.currentPlayMusic?.genre[0]}
                              </div>
                              {/* player */}
                              <div className="pt-2 w-full">
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
                                      audio.currentTime =
                                        (audio.duration / 100) * e.target.value;
                                      setAudioPercentage(e.target.value);
                                    }
                                  }}
                                />
                                <audio
                                  ref={audioRef}
                                  onPlay={() => setAudioPlaying(true)}
                                  onPause={() => setAudioPlaying(false)}
                                  onTimeUpdate={(e) => {
                                    const audio = e.target;
                                    setAudioPercentage(
                                      (audio.currentTime / audio.duration) * 100
                                    );
                                  }}
                                  src={musicStore.currentPlayMusic?.music}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <img
                            src={musicStore.currentMusic?.img}
                            alt="bg"
                            className={"w-full h-full"}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
