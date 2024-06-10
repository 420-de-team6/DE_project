import { create } from "zustand";

/**
 * An energetic classical symphony with fast-paced strings, bold brass, and dynamic timpani. strong drum emotions bpm: 130
 * An energetic classical symphony with fast-paced strings, bold brass, and dynamic timpani. strong drum emotions bpm: 180
 *
 *
 * A smooth modern jazz track with soulful saxophone, intricate piano solos, and a steady upright bass.
 */

/**
 * musicList
 * {
 *  name: string
 *  description: string;
 *  img: string
 *  artist: string;
 *  genre: string;
 *  generateMusics: string[];
 * }
 *
 */
export const useMusicStore = create((set) => ({
  musicList: [
    {
      name: "Hot Sweet",
      description: "Hot sweet ",
      img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
      originalMusic: "/music/hot_sweet.wav",
      artist: "NewJeans",
      genre: ["K pop", "Miami Bass"],
      // 생성 시점
      from: "3:00",
      to: "4:00",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: "Original",
          prompt: "Original",
          img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
          music: "/music/hot_sweet/original.wav",
        },
        {
          genre: "K pop",
          prompt: "Generate Music 1",
          img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
          music: "/music/hot_sweet/jazz.wav",
        },
      ],
    },
    {
      name: "Hot Sweet",
      description: "Hot sweet ",
      img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
      originalMusic: "/music/hot_sweet.wav",
      artist: "NewJeans",
      genre: ["K pop", "Miami Bass"],
      // 생성 시점
      from: "3:00",
      to: "4:00",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: "Original",
          prompt: "Original",
          img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
          music: "/music/hot_sweet/original.wav",
        },
        {
          genre: "K pop",
          prompt: "Generate Music 1",
          img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
          music: "/music/hot_sweet/jazz.wav",
        },
      ],
    },
    {
      name: "Hot Sweet",
      description: "Hot sweet ",
      img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
      originalMusic: "/music/hot_sweet.wav",
      artist: "NewJeans",
      genre: ["K pop", "Miami Bass"],
      // 생성 시점
      from: "3:00",
      to: "4:00",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: "Original",
          prompt: "Original",
          img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
          music: "/music/hot_sweet/original.wav",
        },
        {
          genre: "K pop",
          prompt: "Generate Music 1",
          img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
          music: "/music/hot_sweet/jazz.wav",
        },
      ],
    },
    {
      name: "Hot Sweet",
      description: "Hot sweet ",
      img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
      originalMusic: "/music/hot_sweet.wav",
      artist: "NewJeans",
      genre: ["K pop", "Miami Bass"],
      // 생성 시점
      from: "3:00",
      to: "4:00",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: "Original",
          prompt: "Original",
          img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
          music: "/music/hot_sweet/original.wav",
        },
        {
          genre: "K pop",
          prompt: "Generate Music 1",
          img: "https://img.youtube.com/vi/p-WJM05Eh8N7jOcU/0.jpg",
          music: "/music/hot_sweet/jazz.wav",
        },
      ],
    },
  ],

  // 현재 선택된 음악
  currentMusic: null,
  // 현재 음악 객체 내에 있는 플레이 중인 음악
  currentPlayMusic: null,

  selectMusic: (music) =>
    set({ currentMusic: music, currentPlayMusic: music?.generateMusics[0] }),
  selectPlayMusic: (music) => set({ currentPlayMusic: music }),
}));

export const useYoutubeMusicStore = create((set) => ({
  youtubeLink: "",
  youtubeMusicList: [],
  youtubeMainMusic: null,
  youtubeSubMusic: null,
}));
