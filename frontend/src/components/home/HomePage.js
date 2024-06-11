import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleClickViewMusic = () => {
    navigate("/view-music");
  };

  const handleClickGenerateWithTop100 = () => {
    // TODO: top-100 플레이리스트로 save 요청 후에
    // 응답이 true이면 create-music 페이지로 이동

    // 혹은 서버에 API 따로 파기
    // 근데 전자가 . 더나을듯
    navigate("/create-music");
  };

  const handleClickGenerate = () => {
    fetch("http://localhost:8000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue1: url }), // 입력 값을 JSON 형식으로 변환하여 전송합니다.
    })
      .then((response) => response.json())
      .then((data) => {
        // 서버로부터의 응답을 처리합니다.
        console.log("서버 응답:", data);
        if (data.message === "true") {
          // setMusicList(data.music_list);
          if (data.music_list.length > 0) {
            navigate("/create-music");
          }
        }
      })
      .catch((error) => {
        console.error("오류:", error);
      });
  };
  return (
    <>
      <div className="w-full h-full bg-gray-950 flex flex-col relative">
        <div className="m-4 flex flex-col  gap-8">
          <div className="relative isolate  bg-gray-900 py-16 sm:py-24 lg:py-32 rounded-2xl">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              {/* <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"> */}
              <div className="flex justify-center flex-col items-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Mix your
                  <span className=" inline-flex flex-row gap-1 w-fit justify-center align-bottom pl-2 pr-2">
                    <img
                      src="/image/icons/youtube.png"
                      alt="youtube"
                      width={40}
                      height={40}
                    />
                    Music
                  </span>
                  Playlist
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                  Nostrud amet eu ullamco nisi aute in ad minim nostrud
                  adipisicing velit quis. Duis tempor incididunt dolore.
                </p>
                <div className="mt-6 flex max-w-md gap-x-4 w-full ">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="youtube-url"
                    name="youtube-url"
                    type="url"
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Enter youtube playlist url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={handleClickGenerate}
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
            <div
              className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
              aria-hidden="true"
            >
              <div
                className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                // style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                style={{
                  clipPath:
                    " polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              ></div>
              {/* </div> */}
            </div>
          </div>
          <div className="flex flex-row gap-8">
            <div
              className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 rounded-2xl flex-1 cursor-pointer hover:opacity-40  transition-all active:opacity-20"
              onClick={handleClickViewMusic}
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"> */}
                <div className="flex justify-center flex-col  items-start w-fit">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    현재 만들어진 노래 리스트
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-gray-300">
                    이미 합성된 노래들을 확인하세요.
                  </p>
                </div>
              </div>
              <div
                className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                  // style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                  style={{
                    clipPath:
                      " polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                ></div>
                {/* </div> */}
              </div>
            </div>
            <div
              className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 rounded-2xl flex-1  cursor-pointer hover:opacity-40  transition-all active:opacity-20"
              onClick={handleClickGenerateWithTop100}
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"> */}
                <div className="flex justify-center flex-col items-start w-fit">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    기존 플레이리스트 시작하기
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-gray-300">
                    Top-100 플레이리스트로 음악을 생성해보세요
                  </p>
                </div>
              </div>
              <div
                className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                  // style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                  style={{
                    clipPath:
                      " polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                ></div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
