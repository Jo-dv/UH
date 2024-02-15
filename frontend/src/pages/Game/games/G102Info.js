import { useEffect, useRef, useState } from "react";
import chipi from "../../../asset/image/chipi.gif";
import stop from "../../../asset/image/stop.gif";
import hint from "../../../asset/image/hint.gif";

const G102Info = ({ maxTime, maxRound, setGameLoading, session }) => {
  const sendGameStart = (e) => {
    e.preventDefault();
    session
      .signal({
        data: "Game Start", // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "game-GameStart", // The type of message (optional)
      })
      .then(() => {
        // console.log("정답제출 보냄 :", answerMsg);
        // setAnswerMsg("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  session.on("signal:game-GameStart", (event) => {
    setGameLoading(false);
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, 2999);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="relative ml-3 z-10 text-xl mt-5 leading-8">
      <p className="text-3xl font-[round-extrabold]">인물 맞추기</p>
      {/* <br /> 제한 시간 동안 많은 문제를 맞춘 팀이 승리합니다. */}
      <br /> <span className="text-red-600">사진을 보고 인물을 맞추세요!</span>
      <br /> 인물을 많이 맞추는 팀이 승리합니다.
      <br/>
      <br /> 총 {maxTime / 1000}초 동안 진행합니다.
      {/* <br /> 총 {maxRound}라운드 진행합니다. */}
      <br />
      <div className="absolute top-60 bg-white p-1 rounded-3xl border-slate-500 inline-block mt-[-15px] flex justify-center mx-auto w-full">
      <div className="text-center text-lg">
          {/* <h1 className="text-2xl font-[round-bold] mt-1 mb-2">아이템</h1> */}
          <div>
            <div className="flex items-center space-x-4">
              <img src={chipi} alt="chipi" className="rounded-full w-11 h-11" />
              <p>상대팀의 화면을 가립니다</p>
            </div>
            <div className="flex items-center space-x-4">
              <img src={stop} alt="stop" className="rounded-full w-11 h-11" />
              <p>상대팀의 채팅창이 사라집니다</p>
            </div>
            <div className="flex items-center space-x-4">
              <img src={hint} alt="talk" className="rounded-full w-11 h-11" />
              <p>우리팀에게 인물의 초성을 보여줍니다</p>
            </div>
          </div>
          </div>
        </div>
        <div className="mt-32 h-20 animate-fade animate-delay-[3000ms] flex justify-center">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <div className="animate-bounce ">
            <div
              className="bg-orange-800 hover:bg-orange-800 shadow-xl py-2 px-4 rounded-3xl text-3xl font-[round-extrabold] z-11 mt-20"
              style={{ width: "300px", height: "70px" }}
            >
              <button
                onClick={sendGameStart}
                className="bg-tab2 hover:bg-tab7 shadow-inner py-2 px-4 rounded-3xl text-4xl font-[round-extrabold] z-12 -ml-5 -mt-5"
                style={{ width: "300px", height: "70px" }}
              >
                <p className="text-white font-[button]">Game Start</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default G102Info;
