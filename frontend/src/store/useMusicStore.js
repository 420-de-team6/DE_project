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
      name: "Lets Funkey",
      description: "Lets Funkey",
      img: "https://www.bgmpresident.com/adm/data/bbs/bgmp/2406030130146_1.jpg",
      originalMusic: "/music/Lets_Funky/Lets Funky.wav",
      artist: "브금대통령",
      genre: ["disko", "danceable"],
      // 생성 시점
      from: "0:00",
      to: "0:15",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: ["disko", "danceable"],
          prompt: "Original",
          img: "https://www.bgmpresident.com/adm/data/bbs/bgmp/2406030130146_1.jpg",
          music: "/music/Lets_Funky/Lets Funky.wav",
        },
        {
          genre: ["reggae", "rhythmic"],
          prompt: "Generate Music 1",
          img: "https://www.bgmpresident.com/adm/data/bbs/bgmp/2406030130146_1.jpg",
          music: "/music/Lets_Funky/Lets Funky_reggae.wav",
        },
      ],
    },
    {
      name: "mycat",
      description: "mycat",
      img: "https://www.bgmpresident.com/adm/data/bbs/bgmp/2405201206363_1.jpg",
      originalMusic: "/music/mycat/mycat.wav",
      artist: "브금대통령",
      genre: ["country", "narrative"],
      // 생성 시점
      from: "0:00",
      to: "0:15",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: ["country", "narrative"],
          prompt: "Original",
          img: "https://www.bgmpresident.com/adm/data/bbs/bgmp/2405201206363_1.jpg",
          music: "/music/mycat/mycat.wav",
        },
        {
          genre: ["jazz", "complex"],
          prompt: "Generate Music 1",
          img: "https://www.bgmpresident.com/adm/data/bbs/bgmp/2406030130146_1.jpg",
          music: "/music/mycat/mycat_jazz.wav",
        },
      ],
    },
    {
      name: "Parting",
      description: "Parting",
      img: "https://www.bgmpresident.com/adm/data/bbs/bgmp/2405290223167_1.jpg",
      originalMusic: "/music/Parting/Parting.wav",
      artist: "브금대통령",
      genre: ["country", "heartfelt"],
      // 생성 시점
      from: "0:00",
      to: "0:15",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: ["country", "heartfelt"],
          prompt: "Original",
          img: "https://www.bgmpresident.com/adm/data/bbs/bgmp/2405290223167_1.jpg",
          music: "/music/Parting/Parting.wav",
        },
        {
          genre: ["pop", "melodic"],
          prompt: "Generate Music 1",
          img: "https://www.bgmpresident.com/adm/data/bbs/bgmp/2405290223167_1.jpg",
          music: "/music/Parting/Parting_pop.wav",
        },
      ],
    },
    {
      name: "realize",
      description: "realize",
      img: "https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/084/630/393/84630393_1703057545397_1_600x600.JPG",
      originalMusic: "/music/realize/realize.wav",
      artist: "실리카겔",
      genre: ["rock", "energetic"],
      // 생성 시점
      from: "0:00",
      to: "0:15",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: ["rock", "energetic"],
          prompt: "Original",
          img: "https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/084/630/393/84630393_1703057545397_1_600x600.JPG",
          music: "/music/realize/realize.wav",
        },
        {
          genre: ["jazz", "smooth"],
          prompt: "Generate Music 1",
          img: "https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/084/630/393/84630393_1703057545397_1_600x600.JPG",
          music: "/music/realize/realize_Relaxed and smooth Cool jazz.wav",
        }
      ],
    },
    {
      name: "antifreeze",
      description: "antifreeze",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbr4hR2BblaRtcM-f7NtGllsUZ6NmGFjnJTQ&s",
      originalMusic: "/music/antifreeze/antifreeze.wav",
      artist: "검정치마",
      genre: ["rock", "energetic"],
      // 생성 시점
      from: "0:00",
      to: "0:15",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: ["pop", "melodic"],
          prompt: "Original",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbr4hR2BblaRtcM-f7NtGllsUZ6NmGFjnJTQ&s",
          music: "/music/antifreeze/antifreeze.wav",
        },
        {
          genre: ["jazz", "smooth"],
          prompt: "Generate Music 1",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbr4hR2BblaRtcM-f7NtGllsUZ6NmGFjnJTQ&s",
          music: "/music/antifreeze/antifreeze_Relaxed and smooth Cool jazz.wav",
        },
        {
          genre: ["classical", "elegant"],
          prompt: "Generate Music 1",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbr4hR2BblaRtcM-f7NtGllsUZ6NmGFjnJTQ&s",
          music: "/music/antifreeze/antifreeze_classic.wav",
        }
      ],
    },
    {
      name: "밤양갱",
      description: "밤양갱",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoxRuYdIR6Ux8ctjKj_8xJ-oTinC38NgC3rw&s",
      originalMusic: "/music/bamyang/bamyang_original_from_2s.wav",
      artist: "비비",
      genre: ["pop", "upbeat"],
      // 생성 시점
      from: "0:02",
      to: "0:17",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: ["pop", "upbeat"],
          prompt: "Original",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoxRuYdIR6Ux8ctjKj_8xJ-oTinC38NgC3rw&s",
          music: "/music/bamyang/bamyang_original_from_2s.wav",
        },
        {
          genre: ["rock", "gritty"],
          prompt: "Generate Music 1",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoxRuYdIR6Ux8ctjKj_8xJ-oTinC38NgC3rw&s",
          music: "/music/Bamyang/bamyang_generate_classic_rock.mp3",
        }
      ],
    },
    {
      name: "고민중독",
      description: "고민중독",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1sa7NOWVT6ZgRXzqbC6Q3KXX4sAGcHC4DDg&s",
      originalMusic: "/music/AddictionToWorry/AddictionToWorry_original_from_20s.wav",
      artist: "QWER",
      genre: ["pop", "upbeat"],
      // 생성 시점
      from: "0:20",
      to: "0:35",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: ["pop", "upbeat"],
          prompt: "Original",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1sa7NOWVT6ZgRXzqbC6Q3KXX4sAGcHC4DDg&s",
          music: "/music/bamyang/bamyang_original_from_2s.wav",
        },
        {
          genre: ["jazz", "improvisational"],
          prompt: "Generate Music 1",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1sa7NOWVT6ZgRXzqbC6Q3KXX4sAGcHC4DDg&s",
          music: "/music/AddictionToWorry/AddictionToWorry_generate_jazz.mp3",
        }
      ],
    },
    {
      name: "Ditto",
      description: "Ditto",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1s-eq8h5WURY_r0ssAwpLloXp4TELZQMt1w&s",
      originalMusic: "/music/Ditto/Ditto.wav",
      artist: "뉴진스",
      genre: ["pop", "catchy"],
      // 생성 시점
      from: "0:00",
      to: "0:15",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: ["pop", "catchy"],
          prompt: "Original",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1s-eq8h5WURY_r0ssAwpLloXp4TELZQMt1w&s",
          music: "/music/Ditto/Ditto-Hip-hop.wav",
        },
        {
          genre: ["hiphop", "rhythmic"],
          prompt: "Generate Music 1",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1s-eq8h5WURY_r0ssAwpLloXp4TELZQMt1w&s",
          music: "/music/AddictionToWorry/AddictionToWorry_generate_jazz.mp3",
        }
      ],
    },
    {
      name: "Last Dance",
      description: "Last Dance",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIv_CQaizE8YxWov6fLxSXigT1d7ydOfTxzQ&s",
      originalMusic: "/music/lastdance/Last-Dance-Disco.wav",
      artist: "빅뱅",
      genre: ["pop", "melodic"],
      // 생성 시점
      from: "0:00",
      to: "0:15",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: ["pop", "melodic"],
          prompt: "Original",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIv_CQaizE8YxWov6fLxSXigT1d7ydOfTxzQ&s",
          music: "/music/lastdance/Last-Dance-Disco.wav",
        },
        {
          genre: ["disco", "danceable"],
          prompt: "Generate Music 1",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIv_CQaizE8YxWov6fLxSXigT1d7ydOfTxzQ&s",
          music: "/music/lastdance/Last-Dance-Disco.wav",
        }
      ],
    },
    {
      name: "하입보이",
      description: "하입보이",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7fGrFxc83shyzi97j8kqMBH8_cTA0ax1I8Q&s",
      originalMusic: "/music/HypeBoy/Hype-Boy.wav",
      artist: "뉴진스",
      genre: ["pop", "melodic"],
      // 생성 시점
      from: "0:00",
      to: "0:15",
      // generateMusics: ["Generate Music 1", "Generate Music 2"],
      generateMusics: [
        {
          genre: ["pop", "melodic"],
          prompt: "Original",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7fGrFxc83shyzi97j8kqMBH8_cTA0ax1I8Q&s",
          music: "/music/HypeBoy/Hype-Boy.wav",
        },
        {
          genre: ["rock", "rebellious"],
          prompt: "Generate Music 1",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7fGrFxc83shyzi97j8kqMBH8_cTA0ax1I8Q&s",
          music: "/music/HypeBoy/Hype-Boy-Rock.wav",
        }
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
